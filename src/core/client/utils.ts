import * as alt from 'alt-client';
import native from 'natives';
export function mostrarHelpText(text, sound, milliseconds) {
    native.beginTextCommandDisplayHelp("STRING");
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandDisplayHelp(0, false, sound, milliseconds);
}

alt.onServer('mostrarHelpText', mostrarHelpText);
