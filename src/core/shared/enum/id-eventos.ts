// Server -> Client
export const EventosClient = {
    // Eventos de devtools
    DT_RMLMODE: 'devtools:rmlmode',

    MENU_STAFF: 'menu:staff',

    UP_NIVEL: 'nivel:upNivel',
    UP_XP: 'nivel:upXp',

    UTILS_HELPTEXT: 'utils:enviarHelpText',
    UTILS_NOTIFICATION: 'utils:enviarNotification',
}

// Client -> Server
export const EventosServer = {
    // Eventos da staff
    STAFF_SPAWNAR_CARRO: 'staff:spawnarCarro',

    JOGADOR_SET_DINHEIRO: 'jogador:setDinheiro',

    UP_NIVEL: 'nivel:upNivel',
    UP_XP: 'nivel:upXp',
}
