import * as alt from 'alt-client'
import native from 'natives'

export function mostrarHelpText(texto: string, tocarSom: boolean, milliseconds: number) {
    native.beginTextCommandDisplayHelp('STRING')

    native.addTextComponentSubstringPlayerName(texto)

    native.endTextCommandDisplayHelp(0, false, tocarSom, milliseconds)
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
