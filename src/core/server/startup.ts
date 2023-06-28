import * as dotenv from 'dotenv'
import * as alt from 'alt-server'

import { connectLocalClient } from './util/reconnect'

import './util/ipc' // Used to reconnect, do not remove.
import './comandos/startup'
import './listeners/startup'
import './service/startup'
import './npc/startup'

connectLocalClient()

alt.log(`LiteGaming RPG - Servidor iniciado`)
