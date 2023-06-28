import alt from 'alt-server'
import { Vector3 } from 'alt-shared'
import { ObjectId } from 'mongodb'
import { Posicao } from '@lg-shared/mundo'
import { EventosClient, EventosServer } from '@lg-shared/enum/id-eventos'
import { Locais } from '@lg-shared/enum/locais'

export class Jogador {
    private static readonly XP_POR_LEVEL = 6000
    private static readonly DEFAULT_XP_POR_UP = 1000
    private static readonly DEFAULT_SEGUNDOS_POR_UP = 600

    constructor(
        public readonly nome: string,
        public readonly sexo: Jogador.Sexo,
        public pos: Posicao = Locais.SPAWN_PADRAO,
        public dinheiro: number = 0,
        public saldoBanco: number = 0,
        public rotacao?: Vector3,
        private _ultimoLogin?: Date,
        private _nivel: Jogador.Nivel = {
            atual: 1,
            xp: 0,
            segundosProximoUp: Jogador.DEFAULT_SEGUNDOS_POR_UP,
        },
        public _id?: ObjectId
    ) {}

    get nivel(): Jogador.Nivel {
        return this._nivel
    }

    private set nivel(value: Jogador.Nivel) {
        this._nivel = value
    }

    get ultimoLogin(): Date | undefined {
        return this._ultimoLogin
    }

    private set ultimoLogin(value: Date) {
        this._ultimoLogin = value
    }

    atribuirDadosPlayer(player: alt.Player) {
        player.model = this.sexo.modelo
        player.setSyncedMeta('NAME', player.name)
        player.setClothes(11, 86, 1)

        this.rotacao && (player.rot = this.rotacao)

        player.spawn(this.pos, 3 * 1000)

        alt.emitClient(player, EventosServer.JOGADOR_SET_DINHEIRO, [this.dinheiro, this.saldoBanco])
    }

    sincronizarDadosPlayer(player: alt.Player) {
        this.pos = player.pos
        this.rotacao = player.rot
    }

    registrarNovoLogin() {
        this.ultimoLogin = new Date()
    }

    registrarSegundoVerificandoUp() {
        this.nivel.segundosProximoUp -= 1

        this.verificarUpXp()
        this.verificarUpNivel()
    }

    private verificarUpXp() {
        if (this.nivel.segundosProximoUp <= 0) {
            this.nivel.segundosProximoUp = Jogador.DEFAULT_SEGUNDOS_POR_UP

            this.uparXp()
        }
    }

    private uparXp() {
        this.nivel.xp += Jogador.DEFAULT_XP_POR_UP

        const player = alt.Player.all.find((p) => p.name == this.nome)

        if (!player) return

        alt.emitClient(player, EventosClient.UP_XP, [Jogador.DEFAULT_XP_POR_UP, this.nivel.xp])
        alt.emit(EventosServer.UP_XP, [player, Jogador.DEFAULT_XP_POR_UP, this.nivel.xp])
    }

    private verificarUpNivel() {
        if (this.nivel.xp >= Jogador.XP_POR_LEVEL) {
            this.uparNivel()
        }
    }

    private uparNivel() {
        this.nivel.atual += 1
        this.nivel.xp -= 6000

        const player = alt.Player.all.find((p) => p.name == this.nome)

        if (!player) return

        alt.emitClient(player, EventosClient.UP_NIVEL, [this.nivel.atual])
        alt.emit(EventosServer.UP_NIVEL, [player, this.nivel.atual])
    }

    toSchema(): Jogador.Schema {
        return {
            nome: this.nome,
            sexo: this.sexo.id,
            pos: this.pos,
            rot: this.rotacao,
            nivel: this.nivel,
            dinheiro: this.dinheiro,
            saldoBanco: this.saldoBanco,
            ultimoLogin: this.ultimoLogin,
            _id: this._id,
        }
    }

    static fromSchema(schema: Jogador.Schema): Jogador {
        return new Jogador(
            schema.nome,
            Jogador.Sexo.SEXO_POR_ID[schema.sexo],
            schema.pos,
            schema.dinheiro,
            schema.saldoBanco,
            schema.rot,
            schema.ultimoLogin,
            schema.nivel,
            schema._id
        )
    }
}

export namespace Jogador {
    export class Sexo {
        static readonly MASCULINO = new Sexo(0, 'mp_m_freemode_01', 'Masculino')
        static readonly FEMININO = new Sexo(1, 'mp_f_freemode_01', 'Feminino')
        static readonly SEXO_POR_ID = {
            [Sexo.MASCULINO.id]: Sexo.MASCULINO,
            [Sexo.FEMININO.id]: Sexo.FEMININO,
        }

        constructor(public id: number, public modelo: string, public exibicao: string) {}
    }

    export interface Nivel {
        atual: number
        xp: number
        segundosProximoUp: number
    }

    export interface Schema {
        nome: string
        sexo: number
        pos: Posicao
        rot?: Vector3
        nivel: Nivel
        dinheiro: number
        saldoBanco: number
        ultimoLogin?: Date
        _id?: ObjectId
    }
}
