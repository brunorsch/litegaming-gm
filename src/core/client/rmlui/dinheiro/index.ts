import * as alt from 'alt-client'
import { EventosServer } from '@lg-shared/enum/id-eventos'
import * as utils from '@lg-client/utils/index'

const document = new alt.RmlDocument('./index.rml')
const rootElement = document.getElementByID('dinheiro-container')
const dinheiroElement = document.getElementByID('saldoDinheiro')
const bancoElement = document.getElementByID('saldoBanco')

const teclaTrigger = 90

let emExibicao = false

alt.onServer(EventosServer.JOGADOR_SET_DINHEIRO, ([dinheiro, banco]: [number, number]) => {
    dinheiroElement!.innerRML = `$${dinheiro}`
    bancoElement!.innerRML = `$${banco}`
})

const fecharAutomatico: Function = utils.debounce(() => {
    alternarExibicao(false)
}, 3 * 1000)

alt.on('keyup', (key) => {
    if (key !== teclaTrigger) return

    if (!emExibicao) {
        alternarExibicao(true)

        fecharAutomatico()
    } else {
        alternarExibicao(false)
    }
})

function alternarExibicao(novoValor: boolean) {
    emExibicao = novoValor

    if (novoValor) {
        rootElement!.removeClass('hide')
    } else {
        rootElement!.addClass('hide')
    }
}
