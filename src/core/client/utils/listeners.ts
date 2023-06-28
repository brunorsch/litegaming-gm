import alt from 'alt-client'
import { EventosClient, EventosServer } from '@lg-shared/enum/id-eventos'
import { enviarNotificacaoComFoto, mostrarHelpText } from '@lg-client/utils/functions'

alt.onServer(EventosClient.UTILS_HELPTEXT, mostrarHelpText)
alt.onServer(EventosClient.UTILS_NOTIFICATION, enviarNotificacaoComFoto)
