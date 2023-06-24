import alt from 'alt-client'
import { EventosServer } from '@lg-shared/enum/id-eventos'
import { mostrarHelpText } from '@lg-client/utils/functions'

alt.onServer(EventosServer.UTILS_HELPTEXT, mostrarHelpText)
