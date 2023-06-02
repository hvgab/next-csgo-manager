import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SERVERS = [
    {
        host: "theck1.no",
        port: 27015
    },
    {
        host: "theck1.no",
        port: 27016
    },
    {
        host: "theck1.no",
        port: 27030
    },
    {
        host: "csgo.gabbeh.no",
        port: 27015
    },
    {
        host: "csgo.gabbeh.no",
        port: 27016
    },
]

/**
 * For each server, create a Server record in the DB
 */
function seedServer() {
    Promise.all(SERVERS.map(server => prisma.server.create({ data: { host: server.host, port: server.port } })))
        .then(() => console.info('[SEED] Succussfully create server records'))
        .catch(e => console.error('[SEED] Failed to create server records', e))
}

seedServer();