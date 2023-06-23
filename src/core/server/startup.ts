import * as dotenv from 'dotenv'
import * as alt from 'alt-server'

import { connectLocalClient } from './util/reconnect'
import { conectarDatabase } from '@lg-server/service/database.service'

import './comandos/index'
import './listeners/index'
import './npc/index'
import './util/ipc' // Used to reconnect, do not remove.

dotenv.config()

conectarDatabase()
connectLocalClient()

alt.log(`LiteGaming RPG - Servidor iniciado`)
