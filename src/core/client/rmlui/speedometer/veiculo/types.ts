import { RmlElement } from 'alt-client'

export type Marcha = { standard: (string | number)[] } | { eletrico: string[] }

export type Veiculo = 'standard' | 'eletrico'

export type Rml = {
    id: RmlElement
    atual: string
}
