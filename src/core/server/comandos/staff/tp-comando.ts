import * as chat from 'alt:vchat'
import * as alt from 'alt-server'
import * as comandos from '@lg-server/comandos/comandos'
import { PrefixosChat } from '@lg-shared/enum/constantes-chat'

chat.registerCmd('tp', (player: alt.Player, [x, y, z]: [string, string, string]) => {
    const waypointSetado = player.currentWaypoint

    if (x || y || z) {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z))) {
            chat.send(player, PrefixosChat.STAFF + 'As coordenadas devem ser numéricas')
            return
        }

        player.pos = new alt.Vector3(Number(x), Number(y), Number(z))

        chat.send(player, PrefixosChat.STAFF + 'Você foi teleportado para as coordenadas especificadas.')
    } else if (waypointSetado) {
        player.pos = new alt.Vector3(waypointSetado.x, waypointSetado.y, waypointSetado.z)

        chat.send(player, PrefixosChat.STAFF + 'Você foi teleportado para o waypoint setado no mapa.')
    } else {
        chat.send(player, PrefixosChat.STAFF + 'Você deve especificar as coordenadas ou setar um waypoint no mapa.')
    }
})

comandos.addSugestao({
    name: 'tp',
    description: 'Teleporta para alguma coordenada ou para o waypoint setado no mapa',
})
