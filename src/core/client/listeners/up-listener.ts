import * as alt from 'alt-client'
import * as game from 'natives'
import { EventosClient } from '@lg-shared/enum/id-eventos'
import { enviarNotificacao } from '@lg-client/utils/index'

alt.onServer(EventosClient.UP_XP, ([xpGanho, xpAtual]: [number, number]) => {
    game.playSoundFrontend(-1, 'MP_RANK_UP', 'HUD_FRONTEND_DEFAULT_SOUNDSET', false)
    enviarNotificacao(`Você ganhou +${xpGanho} de XP! (${xpAtual}/6000)`)
})
