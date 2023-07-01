import * as alt from 'alt-client'
import * as native from 'natives'
import { EventosServer } from '@lg-shared/enum/id-eventos'
import { Posicao } from '@lg-shared/mundo'
import { debounce } from '@lg-client/utils/functions'

let isAtualizandoWaypoint = false
let dadosUltimoWaypoint: alt.IVector3 | null

function tick(): void {
    if (!isAtualizandoWaypoint) {
        atualizarWaypoint()
    }
}

const funcaoAtualizacao = debounce(tick, 250)

/**
 * Sends an event to the server when the local player's waypoint is updated.
 * @static
 * @return {void}
 *
 */
export async function atualizarWaypoint(): Promise<void> {
    if (isAtualizandoWaypoint) {
        return
    }

    isAtualizandoWaypoint = true
    const waypoint = native.getFirstBlipInfoId(8)

    const foiRemovido = await verificarWaypointRemovido(waypoint)

    if (foiRemovido) {
        isAtualizandoWaypoint = false
        return
    }

    const coords = native.getBlipInfoIdCoord(waypoint)

    if (dadosUltimoWaypoint && dadosUltimoWaypoint.x === coords.x && dadosUltimoWaypoint.y === coords.y) {
        isAtualizandoWaypoint = false
        return
    }

    const coordsWaypoint = await procurarCoordenadasPorWaypoint(coords)

    // Did not find the ground position
    dadosUltimoWaypoint = coordsWaypoint

    alt.emitServer(EventosServer.JOGADOR_SET_WAYPOINT, coordsWaypoint)

    alt.logDebug('Enviando atualizações do waypoint para o servidor.')

    native.requestCollisionAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z)
    native.clearFocus()

    isAtualizandoWaypoint = false
}

async function verificarWaypointRemovido(waypoint: number, coords?: Posicao): Promise<boolean> {
    if (!native.doesBlipExist(waypoint) || !coords) {
        if (dadosUltimoWaypoint !== null) {
            dadosUltimoWaypoint = null
            alt.emitServer(EventosServer.JOGADOR_SET_WAYPOINT, null)
        }
        return true
    } else return false
}

/**
 * Busca a posição de Z (Altitude da coordenada) com base nas coordenadas de um waypoint
 */
async function procurarCoordenadasPorWaypoint(coords: Posicao): Promise<Posicao | null> {
    let pontoZInicial = 0

    for (let i = 0; i < 100; i++) {
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
            return null
        }

        native.requestCollisionAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z)
        native.clearFocus()

        return { x: coords.x, y: coords.y, z: pontoZVerdadeiro }
    }

    return null
}

alt.everyTick(() => {
    funcaoAtualizacao()
})
