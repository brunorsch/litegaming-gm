import * as chat from 'alt:vchat'
import * as alt from 'alt-server'
import { EventosClient } from '@lg-shared/enum/id-eventos'
import * as comandos from '@lg-server/comandos/comandos'

chat.registerCmd('staffmenu', (player: alt.Player) => {
    alt.emitClient(player, EventosClient.MENU_STAFF)
})

comandos.addSugestao({
    name: 'staffmenu',
    description: 'Abre o menu de staff',
})
