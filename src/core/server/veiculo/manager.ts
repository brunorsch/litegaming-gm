import alt from 'alt-server'

const veiculosStaff = new Map<number, alt.Vehicle>()

export function spawnarVeiculoStaff(player: alt.Player, modelo: string) {
    if (veiculosStaff.has(player.id)) {
        veiculosStaff.get(player.id)?.destroy()
    }

    let carro = new alt.Vehicle(alt.hash(modelo), player.pos.x, player.pos.y, player.pos.z, 0, 0, 0)

    player.setIntoVehicle(carro, 1)
}
