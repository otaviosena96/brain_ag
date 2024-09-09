import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const crops = [
    { name: 'Trigo', code: 1 },
    { name: 'Milho', code: 2 },
    { name: 'Soja', code: 3 },
    { name: 'Café', code: 4 },
    { name: 'Algodão', code: 5 },
  ]

  for (const crop of crops) {
    await prisma.crop.upsert({
      where: { code: crop.code },
      update: {},
      create: crop,
    })
  }

  console.log('Culturas criadas com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
