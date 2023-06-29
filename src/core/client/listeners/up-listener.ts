import * as alt from 'alt-client'
import * as game from 'natives'
import { EventosClient } from '@lg-shared/enum/id-eventos'
import { enviarNotificacao } from '@lg-client/utils/index'

alt.onServer(EventosClient.UP_XP, ([xpGanho, xpAtual]: [number, number]) => {
    if (xpAtual < 6000) {
        game.playSoundFrontend(-1, 'MP_RANK_UP', 'HUD_FRONTEND_DEFAULT_SOUNDSET', false)
    }

    enviarNotificacao(`Você ganhou +${xpGanho} de XP! (${xpAtual}/6000)`)
})

alt.onServer(EventosClient.UP_NIVEL, ([novoNivel]: [number]) => {
    game.playSoundFrontend(-1, 'RANK_UP', 'HUD_AWARDS', false)

    enviarNotificacao(`Parabéns! Você subiu para o nível ~g~${novoNivel}~s~!`)

    enviarScaleformLevelUp()
})

function enviarScaleformLevelUp() {
    const scaleform = game.requestScaleformMovie('MP_BIG_MESSAGE_FREEMODE')

    game.beginScaleformMovieMethod(scaleform, 'SHOW_SHARD_RANKUP_MP_MESSAGE')
    game.scaleformMovieMethodAddParamPlayerNameString('~y~Level up!')
    game.endScaleformMovieMethod()

    let showScaleform = alt.everyTick(() => {
        game.drawScaleformMovieFullscreen(scaleform, 5, 90, 227, 200, 0)
    })

    alt.setTimeout(() => {
        alt.clearEveryTick(showScaleform)
    }, 5 * 1000)
}
