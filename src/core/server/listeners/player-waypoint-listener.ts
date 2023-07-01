import * as alt from 'alt-server'
import { EventosServer } from '@lg-shared/enum/id-eventos'
import { Posicao } from '@lg-shared/mundo'
import { SyncedMeta } from '@lg-shared/jogador/synced-meta-ids'

alt.onClient(EventosServer.JOGADOR_SET_WAYPOINT, (player: alt.Player, [pos]: [Posicao]) => {
    if (!player || !player.valid) {
        return
    }

    player.currentWaypoint = pos
    player.setSyncedMeta(SyncedMeta.PLAYER_WAYPOINT, pos)
})
