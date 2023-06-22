import * as mongoDb from "mongodb";
import * as dotenv from "dotenv";
import * as alt from "alt-server";
export const collections: {
    jogadores?: mongoDb.Collection
} = {}

export async function connectToDatabase() {
    dotenv.config();

    const client = new mongoDb.MongoClient(process.env.DB_CONNECTION);
    await client.connect();

    const db: mongoDb.Db = client.db(process.env.DB_NAME);

    configurarCollections(db)

    alt.log(`[Server] Conexão com o DB configurada com sucesso`);
}

function configurarCollections(db: mongoDb.Db) {
    collections.jogadores = db.collection('jogador')
}