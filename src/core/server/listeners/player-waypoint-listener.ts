import * as alt from 'alt-server'
import { EventosServer } from '@lg-shared/enum/id-eventos'
import { Posicao } from '@lg-shared/mundo'
import { SyncedMeta } from '@lg-shared/jogador/synced-meta-ids'

alt.onClient(EventosServer.JOGADOR_SET_WAYPOINT, (player: alt.Player, args: Array<any> | null) => {
    alt.log(`Recebido waypoint do jogador ${player.name} (${player.id})`)

    if (!player || !player.valid) {
        return
    }

    const pos: Posicao | null = args ? { x: args[0].x, y: args[0].y, z: args[0].z } : null

    player.currentWaypoint = pos
    player.setSyncedMeta(SyncedMeta.PLAYER_WAYPOINT, pos)
})
