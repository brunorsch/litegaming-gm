import { ObjectId } from 'mongodb'
import { Posicao } from '@lg-shared/mundo'
import alt from 'alt-server'
import { EventosServer } from '@lg-shared/enum/id-eventos'

export class Jogador {
    constructor(
        public nome: string,
        public sexo: Jogador.Sexo,
        public pos: Posicao,
        public dinheiro: number = 0,
        public saldoBanco: number = 0,
        public _id?: ObjectId
    ) {}

    public atribuirDadosPlayer(player: alt.Player) {
        player.model = this.sexo.modelo
        player.setSyncedMeta('NAME', player.name)
        player.setClothes(11, 86, 1)
        player.spawn(this.pos, 3 * 1000)

        alt.emitClient(player, EventosServer.JOGADOR_SET_DINHEIRO, [this.dinheiro, this.saldoBanco])
    }
}

export namespace Jogador {
    export class Sexo {
        static readonly MASCULINO = new Sexo(0, 'mp_m_freemode_01', 'Masculino')
        static readonly FEMININO = new Sexo(1, 'mp_f_freemode_01', 'Feminino')

        constructor(public id: number, public modelo: string, public exibicao: string) {}
    }
}
