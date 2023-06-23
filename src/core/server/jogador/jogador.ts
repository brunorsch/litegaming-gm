import { ObjectId } from 'mongodb'
import { Posicao } from '@lg-shared/mundo'
import alt from 'alt-server'

export class Jogador {
    constructor(public nome: string, public sexo: Jogador.Sexo, public pos: Posicao, public _id?: ObjectId) {}

    public atribuirDadosPlayer(player: alt.Player) {
        player.model = this.sexo.modelo
        player.setSyncedMeta('NAME', player.name)
        player.setClothes(11, 86, 1)

        player.spawn(this.pos, 3 * 1000)
    }
}

export namespace Jogador {
    export class Sexo {
        static readonly MASCULINO = new Sexo('mp_m_freemode_01', 'Masculino')
        static readonly FEMININO = new Sexo('mp_f_freemode_01', 'Feminino')

        constructor(public modelo: string, public exibicao: string) {}
    }
}
