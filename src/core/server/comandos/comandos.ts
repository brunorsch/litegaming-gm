import * as chat from 'alt:vchat'
import * as alt from 'alt-server'

const sugestoes: chat.CommandSuggestion[] = []

export function addSugestao(sugestao: chat.CommandSuggestion) {
    sugestoes.push(sugestao)
}

export function registrarSugestoesComandos(player: alt.Player) {
    sugestoes.forEach((sugestao) => {
        chat.addSuggestion(player, sugestao)
    })
}
