import * as alt from 'alt-client'
import native from 'natives'

export function mostrarHelpText(texto: string, tocarSom: boolean, milliseconds: number) {
    native.beginTextCommandDisplayHelp('STRING')

    native.addTextComponentSubstringPlayerName(texto)

    native.endTextCommandDisplayHelp(0, false, tocarSom, milliseconds)
}

alt.onServer('mostrarHelpText', mostrarHelpText)
