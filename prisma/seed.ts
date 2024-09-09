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

  const producer = await prisma.producer.create({
    data: {
      id: '9f6d007c-ba29-4bab-918b-164577be38ae',
      cpf_cnpj: '009.864.471-88',
      name: 'Otávio Sena',
      property_name: 'Fazenda do Otávio',
      city: 'Campo Grande',
      state: 'MS',
      total_area: 100.0,
      cultivable_area: 80.0,
      vegetation_area: 20.0,
      crops: {
        connect: [{ code: 2 }, { code: 3 }],
      },
    },
  })
  console.log('Produtor criado com sucesso!', producer)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
