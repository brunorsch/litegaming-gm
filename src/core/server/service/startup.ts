import * as dotenv from 'dotenv'
import { conectarDatabase } from './database-service'

import './levelling-service'

dotenv.config()
conectarDatabase()
