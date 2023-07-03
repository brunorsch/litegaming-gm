import * as alt from 'alt-client'
import { CARROS_ELETRICOS } from '@lg-client/rmlui/speedometer/veiculo/tipo'
import { Marcha, Rml } from '@lg-client/rmlui/speedometer/veiculo/types'
import { MARCHA } from '@lg-client/rmlui/speedometer/veiculo/marcha'

export const converterVelocidadeParaKmh = (speed: number): number => {
    return speed * 3.6 * 1.60934421012
}

export const velocidadeParaString = (speed: number): string => {
    return speed.toFixed(0)
}

export const isEletrico = (model: number): boolean => {
    return CARROS_ELETRICOS.includes(model)
}

export const definirRmlui = (marcha: Rml, velocidade: Rml): void => {
    marcha.id.innerRML = marcha.atual
    velocidade.id.innerRML = velocidade.atual.toString()
}

export const velocidadeRML = (atualVelocidade): string => {
    const velocidadeString = velocidadeParaString(atualVelocidade)
    const velocidadeComprimento = velocidadeString.length
    const comprimentoDesejado = Math.max(1, velocidadeComprimento)
    return velocidadeString.padStart(comprimentoDesejado, '0')
}

export const marcha = (id, atual): Rml => ({ id, atual })

export const velocidade = (id, atual): Rml => ({ id, atual })

export const conditions = (atualVelocidade: number, atualMarcha: number) => {
    const conditions = {
        0: atualVelocidade === 0 ? 1 : atualVelocidade > 0 ? 0 : 1,
        1: 2,
        6: 7,
    }

    return conditions.hasOwnProperty(atualMarcha) ? conditions[atualMarcha] : atualMarcha + 1
}
