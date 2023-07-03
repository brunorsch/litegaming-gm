import * as alt from 'alt-client'
import {
    velocidadeParaString,
    converterVelocidadeParaKmh,
    definirRmlui,
    isEletrico,
    marcha,
    velocidade,
    velocidadeRML,
    conditions,
} from '@lg-client/rmlui/speedometer/veiculo/functions'
import { MARCHA } from '@lg-client/rmlui/speedometer/veiculo/marcha'
import { Marcha, Veiculo } from '@lg-client/rmlui/speedometer/veiculo/types'
import { TipoCarro } from '@lg-client/rmlui/speedometer/veiculo/enums'

const document = new alt.RmlDocument('./index.rml')
const rootElement = document.getElementByID('speedometer-container')
const gear = document.getElementByID('gear')
const speed = document.getElementByID('speed')

let intervalo: number

alt.on('enteredVehicle', (vehicle, seat) => {
    intervalo = alt.setInterval(() => {
        if (vehicle && seat === 1) {
            rootElement!.removeClass('hide')

            const modeloVeiculo: Veiculo = isEletrico(vehicle.model) ? TipoCarro.ELETRICO : TipoCarro.STANDARD

            const atualVelocidade = converterVelocidadeParaKmh(vehicle.speed)

            let atualMarcha = vehicle.gear
            let ordemMarcha: Marcha = MARCHA[modeloVeiculo]
            let indexMarcha: number

            indexMarcha = conditions(atualVelocidade, atualMarcha)

            atualMarcha = ordemMarcha[indexMarcha]

            definirRmlui(marcha(gear!, atualMarcha), velocidade(speed!, velocidadeRML(atualVelocidade)))
        }
    }, 500)
})

alt.on('leftVehicle', () => {
    alt.clearInterval(intervalo)

    gear!.innerRML = 'N'
    speed!.innerRML = '000'

    rootElement!.addClass('hide')
})
