import * as alt from 'alt-server'
import * as comandos from '@lg-server/comandos/comandos'
import { Jogador, manager } from '@lg-server/jogador/index'
import { Locais } from '@lg-shared/enum/locais'

alt.on('playerConnect', async (player: alt.Player) => {
    alt.log(`[Info] ${player.name} [${player.id}] conectou no servidor (IP: ${player.ip})`)

    let perfil = (await manager.carregarPerfil(player.id, player)) ?? (await registrarNovoJogador(player))

    if (!perfil) return

    perfil.registrarNovoLogin()

    perfil.atribuirDadosPlayer(player)

    sincronizarData(player)

    comandos.registrarSugestoesComandos(player)
})

function sincronizarData(player: alt.Player) {
    const date = new Date()

    const day = (date.getDate() - 1) as alt.DateTimeDay
    const month = date.getMonth() as alt.DateTimeMonth
    const hours = date.getHours() as alt.DateTimeHour
    const minutes = date.getMinutes() as alt.DateTimeMinute
    const seconds = date.getSeconds() as alt.DateTimeSecond

    player.setDateTime(day, month, date.getFullYear(), hours, minutes, seconds)
}

async function registrarNovoJogador(player: alt.Player): Promise<Jogador | null> {
    alt.log(`[Info] Criando nova conta para jogador ${player.name}!`)

    // TODO: Dinamizar
    const novoPerfil = new Jogador(player.name, Jogador.Sexo.MASCULINO, Locais.SPAWN_PADRAO)

    try {
        await manager.criarPerfil(player.id, novoPerfil)

        alt.log(`[Info] Perfil do jogador ${player.name} criado com sucesso!`)
    } catch (ignored) {
        player.kick('Ocorreu um erro inesperado ao criar seu perfil. Fale com a gente no Discord!')
        return null
    }

    return novoPerfil
}
