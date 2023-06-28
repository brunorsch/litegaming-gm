import * as alt from 'alt-client'
import native from 'natives'
import { TipoNotificacao } from '@lg-shared/enum/notificacoes'

export function mostrarHelpText(texto: string, tocarSom: boolean, milliseconds: number) {
    native.beginTextCommandDisplayHelp('STRING')

    native.addTextComponentSubstringPlayerName(texto)

    native.endTextCommandDisplayHelp(0, false, tocarSom, milliseconds)
}

export function enviarNotificacao(message, blink = false) {
    native.beginTextCommandThefeedPost('STRING')
    native.addTextComponentSubstringPlayerName(message)
    native.endTextCommandThefeedPostTicker(blink, false)
}

export function enviarNotificacaoComFoto(
    message: string,
    icone: string,
    textoRemetente: string | null = null,
    textoAssunto: string | null = null
) {
    enviarNotificacaoComIcone(message, TipoNotificacao.NORMAL, icone, icone, textoRemetente, textoAssunto)
}

export function enviarNotificacaoComIcone(
    message: string,
    tipo: TipoNotificacao = TipoNotificacao.NORMAL,
    dictionary: string | null = null,
    icone: string | null = null,
    textoRemetente: string | null = null,
    textoAssunto: string | null = null
) {
    native.beginTextCommandThefeedPost('STRING')
    native.addTextComponentSubstringPlayerName(message)
    native.endTextCommandThefeedPostMessagetextTu(
        dictionary != null ? dictionary : null,
        icone != null ? icone : null,
        false,
        tipo,
        textoRemetente,
        textoAssunto,
        1.0
    )
    native.endTextCommandThefeedPostTicker(false, false)
}

export function debounce(callback: Function, delay: number) {
    let timer: number | null

    return function () {
        if (timer) alt.clearTimeout(timer)

        timer = alt.setTimeout(() => {
            callback()
            timer = null
        }, delay)
    }
}
