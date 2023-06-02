const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here
    const server = await prisma.server.create({
        data: {
            host: 'theck1.no',
            port: 27015
        },
    })
    console.log(server)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })