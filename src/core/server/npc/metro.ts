// import * as alt from 'alt-server'
// import * as native from 'natives'
//
// // export const trens: alt.Vehicle[][] = []
//
// const trens = generateTrains(true)
//
// alt.on('consoleCommand', (name: string, ...args: string[]) => {
//     if (name == 'trem') {
//         trens.forEach((trem) => {
//             alt.log('Trem: ' + trem.id)
//             alt.log('Localização: ' + trem.pos)
//         })
//     }
// })
//
// function generateTrains(ida: boolean) {
//     let vagaoDaFrente = new alt.Vehicle(alt.hash('metrotrain'), 270.2029, -1210.818, 0, 0, 0, 0)
//     let vagaoDeTras = new alt.Vehicle(alt.hash('metrotrain'), 270.2029, -1210.818, 0, 0, 0, 0)
//
//     return [vagaoDaFrente, vagaoDeTras]
// }
// Comentado até resolver o problema de não conseguir spawnar trens
