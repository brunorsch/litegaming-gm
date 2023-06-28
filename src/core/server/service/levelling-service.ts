import * as alt from 'alt-server'
import { Jogador, manager } from '@lg-server/jogador/index'

alt.setInterval(() => {
    manager.getAll().forEach((jogador: Jogador) => {
        jogador.registrarSegundoVerificandoUp()
    })
}, 1000)
