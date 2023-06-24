import * as alt from 'alt-server'
import * as comandos from '@lg-server/comandos/comandos'
import { Jogador, manager } from '@lg-server/jogador/index'
import { Locais } from '@lg-shared/enum/locais'

alt.on('playerConnect', async (player: alt.Player) => {
    alt.log(`[Info] ${player.name} [${player.id}] conectou no servidor (IP: ${player.ip})`)

    let perfil = (await manager.carregarPerfil(player.id, player.name)) ?? (await registrarNovoJogador(player))

    if (!perfil) return

    perfil.atribuirDadosPlayer(player)

    comandos.registrarSugestoesComandos(player)
})

async function registrarNovoJogador(player: alt.Player): Promise<Jogador | null> {
    alt.log(`[Info] Criando nova conta para jogador ${player.name}!`)

    // TODO: Dinamizar
    const novoPerfil = new Jogador(player.name, Jogador.Sexo.MASCULINO, Locais.SPAWN_PADRAO)

    try {
        await manager.criarPerfil(player.id, novoPerfil)
    } catch (ignored) {
        player.kick('Ocorreu um erro inesperado ao criar seu perfil. Fale com a gente no Discord!')
        return null
    }

    return novoPerfil
}
