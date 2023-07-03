import * as alt from 'alt-client'
import * as native from 'natives'
import { EventosClient, EventosServer } from '@lg-shared/enum/id-eventos'
import { Posicao } from '@lg-shared/mundo'

const ID_BLIP_WAYPOINT = 8

let isAtualizandoWaypoint = false
let dadosUltimoWaypoint: alt.IVector3 | null

function tick(): void {
    if (!isAtualizandoWaypoint) {
        atualizarWaypoint()
    }
}

export async function atualizarWaypoint(): Promise<void> {
    if (isAtualizandoWaypoint) {
        return
    }

    isAtualizandoWaypoint = true
    const waypoint = native.getFirstBlipInfoId(ID_BLIP_WAYPOINT)

    const foiRemovido = await verificarWaypointRemovido(waypoint)

    if (foiRemovido) {
        if (dadosUltimoWaypoint !== null) {
            dadosUltimoWaypoint = null
            alt.emitServer(EventosServer.JOGADOR_SET_WAYPOINT, null)
        }

        isAtualizandoWaypoint = false
        return
    }

    const coordsWaypoint = native.getBlipInfoIdCoord(waypoint)

    if (
        dadosUltimoWaypoint &&
        dadosUltimoWaypoint.x === coordsWaypoint.x &&
        dadosUltimoWaypoint.y === coordsWaypoint.y
    ) {
        alt.log('Dados do waypoint não mudaram, não enviando atualizações.')
        isAtualizandoWaypoint = false
        return
    }

    dadosUltimoWaypoint = coordsWaypoint

    alt.emitServer(EventosServer.JOGADOR_SET_WAYPOINT, [coordsWaypoint])

    alt.logDebug('Enviando atualizações do waypoint para o servidor.')

    native.requestCollisionAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z)
    native.clearFocus()

    isAtualizandoWaypoint = false
}

async function verificarWaypointRemovido(waypoint: number): Promise<boolean> {
    if (!native.doesBlipExist(waypoint)) {
        return true
    } else return false
}

/**
 * Busca a posição de Z (Altitude da coordenada) com base nas coordenadas de um waypoint
 * Não está sendo utilizada no momento
 */
async function procurarCoordenadasPorWaypoint(coords: Posicao): Promise<Posicao | null> {
    let pontoZInicial = 0

    for (let i = 0; i < 100; i++) {
        alt.log('Ponto Z inicial: ' + pontoZInicial)
        native.requestCollisionAtCoord(coords.x, coords.y, coords.z)
        native.setFocusPosAndVel(coords.x, coords.y, pontoZInicial, 0, 0, 0)

        const [isValid, pontoZVerdadeiro] = native.getGroundZFor3dCoord(
            coords.x,
            coords.y,
            pontoZInicial,
            0,
            false,
            false
        )

        if (!isValid) {
            pontoZInicial += 25
            continue
        }

        if (pontoZInicial >= 1500) {
            alt.log('Não foi possível encontrar a coordenada Z do waypoint.')
            return null
        }

        native.requestCollisionAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z)
        native.clearFocus()

        return { x: coords.x, y: coords.y, z: pontoZVerdadeiro }
    }

    return null
}

alt.onServer(EventosClient.JOGADOR_PRONTO, () => {
    alt.setInterval(tick, 500)
})
