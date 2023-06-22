import * as chat from 'alt:vchat';
import alt from 'alt-server';

chat.registerCmd('ajuda', (player: alt.Player, args: Array<string>) => {
    // Abrir Webview de ajuda
})

chat.addSuggetionAll({
    name: 'ajuda',
    description: 'Um comando de ajuda, útil para novos jogadores'  
})