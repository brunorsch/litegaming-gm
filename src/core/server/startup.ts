import './util/ipc'; // Used to reconnect, do not remove.
import * as alt from 'alt-server';

import { connectLocalClient } from './util/reconnect';

import './comandos/index';
import './listeners/index';
import './npc/index'

alt.log(`[Server] LiteGaming sRP - Servidor iniciado`);

connectLocalClient();
