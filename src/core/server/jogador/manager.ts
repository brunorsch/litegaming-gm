import { Jogador } from '@lg-server/jogador/jogador'
import { collections } from '@lg-server/service/database-service'
import alt from 'alt-server'

const jogadoresOnline = new Map<number, Jogador>()

export async function criarPerfil(id: number, perfil: Jogador) {
    jogadoresOnline.set(id, perfil)

    try {
        await collections.jogadores!.insertOne(perfil.toSchema())
    } catch (error) {
        alt.logError(`Erro ao criar perfil do jogador ${perfil.nome}: ${error}`)
        jogadoresOnline.delete(id)
        throw error
    }
}

export async function carregarPerfil(id: number, nomeJogador: string): Promise<Jogador | null> {
    let objetoBanco: Jogador.Schema | null = await collections.jogadores!.findOne({
        nome: nomeJogador,
    })

    if (objetoBanco === null) {
        return null
    }

    const perfil = Jogador.fromSchema(objetoBanco)

    jogadoresOnline.set(id, perfil)

    return perfil
}

export function removerPerfil(id: number) {
    jogadoresOnline.delete(id)
}

export async function salvarPerfil(player: alt.Player) {
    const perfil = jogadoresOnline.get(player.id)

    if (!perfil) {
        alt.logWarning(`Perfil do jogador "${player.name}" não foi encontrado ao tentar o salvamento`)
        return
    }

    perfil.sincronizarDadosPlayer(player)

    const schema = perfil.toSchema()

    await collections.jogadores!.replaceOne({ _id: schema._id }, schema)

    alt.log(`Perfil do jogador ${perfil.nome} salvo com sucesso!`)
}

export function get(player: alt.Player): Jogador | undefined {
    return jogadoresOnline.get(player.id)
}
