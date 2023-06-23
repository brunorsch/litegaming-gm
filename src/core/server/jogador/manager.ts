import { Jogador } from '@lg-server/jogador/jogador'
import { collections } from '@lg-server/service/database.service'
import alt from 'alt-server'

const jogadoresOnline = new Map<number, Jogador>()

export async function criarPerfil(id: number, perfil: Jogador) {
    jogadoresOnline.set(id, perfil)

    try {
        await collections.jogadores.insertOne(perfil)
    } catch (error) {
        alt.logError(`Erro ao criar perfil do jogador ${perfil.nome}: ${error}`)
        jogadoresOnline.delete(id)
        throw error
    }
}

export async function carregarPerfil(id: number, nomeJogador: string): Promise<Jogador | null> {
    let perfil = await collections.jogadores.findOne({
        nome: nomeJogador,
    })

    if (perfil === null) {
        return null
    }

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

    await collections.jogadores.updateOne({ _id: perfil._id }, perfil, { upsert: true })
}

export function get(player: alt.Player): Jogador | undefined {
    return jogadoresOnline.get(player.id)
}
