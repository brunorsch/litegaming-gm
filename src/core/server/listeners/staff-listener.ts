import * as alt from 'alt-server'
import { EventosServer } from '@lg-shared/enum/id-eventos'
import { manager as veiculosManager } from '@lg-server/veiculo/index'

alt.onClient(EventosServer.STAFF_SPAWNAR_CARRO, (player: alt.Player, args: any[]) => {
    let modelo = args[0]

    alt.log(`[Staff] Staffer ${player.name} spawnou um carro modelo ${JSON.stringify(modelo)}`)

    veiculosManager.spawnarVeiculoStaff(player, modelo)
})
