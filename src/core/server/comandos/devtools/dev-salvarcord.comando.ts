import * as chat from 'alt:vchat';
import * as alt from 'alt-server';
import { PrefixosChat } from '@lg-shared/constantes-chat';
import * as comandos from '@lg-server/comandos/comandos';

chat.registerCmd('dev-salvarcoord', (player: alt.Player) => {
    chat.send(player, `${PrefixosChat.STAFF} Coordenadas enviadas pelo console!`);

    if(player.vehicle != null) {
        alt.log(`Coordenadas jogador ${player.name} (veículo): ${JSON.stringify(player.vehicle.pos)}`);
    }

    alt.log(`Coordenadas do jogador ${player.name}: ${JSON.stringify(player.pos)}`);
})

comandos.addSugestao({
    name: 'dev-coords',
    description: 'Enviar as coordenadas do jogador para o console',
})