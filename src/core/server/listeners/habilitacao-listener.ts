import * as alt from 'alt-server'
import * as chat from 'alt:vchat'
import { PrefixosChat } from '@lg-shared/enum/constantes-chat'
import { EventosClient } from '@lg-shared/enum/id-eventos'

alt.on('playerEnteringVehicle', (player: alt.Player, veiculo: alt.Vehicle, seat: number) => {
    let perfil = player.getPerfil()

    if (seat !== -1) {
        return
    }

    if (!perfil?.habilitacao?.verificarPermissao(veiculo)) {
        chat.send(player, PrefixosChat.DETRAN_ERRO + ' Você não tem habilitação para dirigir este veículo.')
        player.emit(EventosClient.VEICULO_SAIR, [veiculo])
    }
})
