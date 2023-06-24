import * as chat from 'alt:vchat'
import * as alt from 'alt-server'
import { PrefixosChat } from '@lg-shared/enum/constantes-chat'
import * as comandos from '@lg-server/comandos/comandos'
import { EventosClient, EventosServer } from '@lg-shared/enum/id-eventos'

chat.registerCmd('dev-rmlmode', (player: alt.Player) => {
    chat.send(player, `${PrefixosChat.STAFF} RMLMode ativado! Backspace para desativar`)

    alt.emitClient(player, EventosClient.DT_RMLMODE)
})

comandos.addSugestao({
    name: 'dev-rmlmode',
    description: 'Ativa o RMLMode (Cursor ON e RMLMode ON)',
})
