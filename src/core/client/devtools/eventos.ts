import * as alt from 'alt-client'
import { EventosServer } from '@lg-shared/enum/id-eventos'

alt.onServer(EventosServer.DT_SALVAR_COORDS, () => {
    alt.log(`Coordenadas do jogador: ${alt.Player.local.pos}`)
})

alt.log('Devtools carregado!')
