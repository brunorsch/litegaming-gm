import * as alt from 'alt-server'
import { manager } from '@lg-server/jogador/index'

alt.on('playerDisconnect', (player, reason) => {
    alt.log(`[Info] ${player.name} [${player.id}] desconectou do servidor`)

    manager.salvarPerfil(player)
})
