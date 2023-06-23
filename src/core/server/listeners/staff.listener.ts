import * as alt from 'alt-server'
import { EventosServer } from '@lg-shared/enum/id-eventos'

alt.onClient(EventosServer.STAFF_SPAWNAR_CARRO, (player: alt.Player, args: any[]) => {
    let modelo = args[0]

    alt.log(`[Staff] Staffer ${player.name} spawnou um carro modelo ${JSON.stringify(modelo)}`)

    let carro = new alt.Vehicle(alt.hash(modelo), player.pos.x, player.pos.y, player.pos.z, 0, 0, 0)
    player.setIntoVehicle(carro, 1)
})
