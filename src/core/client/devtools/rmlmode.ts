import * as alt from 'alt-client'
import { EventosClient } from '@lg-shared/enum/id-eventos'

let rmlModeOn = false

alt.onServer(EventosClient.DT_RMLMODE, () => alternarRmlMode())

alt.on('keyup', (key) => {
    if (key !== 8) return

    if (!rmlModeOn) return

    alternarRmlMode()
})

function alternarRmlMode() {
    if (!rmlModeOn) {
        alt.showCursor(true)
        alt.toggleGameControls(false)
        alt.toggleRmlControls(true)
    } else {
        alt.showCursor(false)
        alt.toggleGameControls(true)
        alt.toggleRmlControls(false)
    }

    rmlModeOn = !rmlModeOn
}
