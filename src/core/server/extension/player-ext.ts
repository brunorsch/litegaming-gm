import { Posicao } from '@lg-shared/mundo'
import { Jogador, manager } from '@lg-server/jogador/index'
import { Player } from 'alt-server'

declare module 'alt-server' {
    export interface Player {
        currentWaypoint: Posicao | null

        getPerfil(): Jogador | undefined
    }
}

Player.prototype.getPerfil = function (): Jogador | undefined {
    return manager.get(this)
}
