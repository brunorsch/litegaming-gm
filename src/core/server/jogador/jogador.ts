import { ObjectId } from 'mongodb'
import { Posicao } from '@lg-shared/mundo'
import alt from 'alt-server'
import { EventosServer } from '@lg-shared/enum/id-eventos'
import { Vector3 } from 'alt-shared'

export class Jogador {
    constructor(
        public readonly nome: string,
        public readonly sexo: Jogador.Sexo,
        public pos: Posicao,
        public rot?: Vector3,
        public dinheiro: number = 0,
        public saldoBanco: number = 0,
        private _ultimoLogin?: Date,
        public _id?: ObjectId
    ) {}

    get ultimoLogin(): Date | undefined {
        return this._ultimoLogin
    }

    private set ultimoLogin(value: Date) {
        this._ultimoLogin = value
    }

    public atribuirDadosPlayer(player: alt.Player) {
        player.model = this.sexo.modelo
        player.setSyncedMeta('NAME', player.name)
        player.setClothes(11, 86, 1)

        this.rot && (player.rot = this.rot)

        player.spawn(this.pos, 3 * 1000)

        alt.emitClient(player, EventosServer.JOGADOR_SET_DINHEIRO, [this.dinheiro, this.saldoBanco])
    }

    public sincronizarDadosPlayer(player: alt.Player) {
        this.pos = player.pos
        this.rot = player.rot
    }

    public registrarNovoLogin() {
        this.ultimoLogin = new Date()
    }

    public toSchema(): Jogador.Schema {
        return {
            nome: this.nome,
            sexo: this.sexo,
            pos: this.pos,
            rot: this.rot,
            dinheiro: this.dinheiro,
            saldoBanco: this.saldoBanco,
            ultimoLogin: this.ultimoLogin,
            _id: this._id,
        }
    }

    public static fromSchema(schema: Jogador.Schema): Jogador {
        return new Jogador(
            schema.nome,
            schema.sexo,
            schema.pos,
            schema.rot,
            schema.dinheiro,
            schema.saldoBanco,
            schema.ultimoLogin,
            schema._id
        )
    }
}

export namespace Jogador {
    export class Sexo {
        static readonly MASCULINO = new Sexo(0, 'mp_m_freemode_01', 'Masculino')
        static readonly FEMININO = new Sexo(1, 'mp_f_freemode_01', 'Feminino')

        constructor(public id: number, public modelo: string, public exibicao: string) {}
    }

    export interface Schema {
        nome: string
        sexo: Sexo
        pos: Posicao
        rot?: Vector3
        dinheiro: number
        saldoBanco: number
        ultimoLogin?: Date
        _id?: ObjectId
    }
}
