import * as alt from 'alt-server';
import { registrarSugestoesComandos } from '@lg-server/comandos/comandos'

alt.on('playerConnect', (player: alt.Player) => {
    alt.log(`${player.name} [${player.id}] conectou no servidor (IP: ${player.ip})`);

    player.model = 'mp_m_freemode_01';
    player.spawn(-1041.5209, -2744.2153, 21.3436, 3);
    player.setClothes(11, 86, 1)
    player.setSyncedMeta('NAME', player.name)

    registrarSugestoesComandos(player)
});