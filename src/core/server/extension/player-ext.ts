import { Posicao } from '@lg-shared/mundo'

declare module 'alt-server' {
    export interface Player {
        currentWaypoint: Posicao | null
    }
}
