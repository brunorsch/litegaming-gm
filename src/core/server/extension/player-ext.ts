import { Posicao } from '@lg-shared/mundo'

declare module 'alt-server' {
    export interface Player {
        /**
         * The current waypoint position on the player's map.
         * @type {(alt.IVector3 | null)}
         *
         */
        currentWaypoint: Posicao | null
    }
}
