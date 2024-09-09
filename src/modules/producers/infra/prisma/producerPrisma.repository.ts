import { PrismaClient } from '@prisma/client'
import { CreateProducerDto } from '../../../../dtos/create-producer.dto'
import { IProducerRepository } from '../../domain/producer.repository'
import { Producer } from '../../domain/producer.model'
import { injectable } from 'tsyringe'

const prisma = new PrismaClient()

@injectable()
export default class ProducerRepository implements IProducerRepository {
  async create(data: CreateProducerDto): Promise<Producer> {
    const {
      cpf_cnpj,
      name,
      property_name,
      city,
      state,
      total_area,
      cultivable_area,
      vegetation_area,
      cropCodes,
    } = data

    const producer = await prisma.producer.create({
      data: {
        cpf_cnpj,
        name,
        property_name,
        city,
        state,
        total_area,
        cultivable_area,
        vegetation_area,
        crops: {
          connect: cropCodes.map((code) => ({ code })),
        },
      },
      include: {
        crops: true,
      },
    })

    return producer
  }
  async findByCpfOrCnpj(cpf_cnpj: string): Promise<Producer | null> {
    const producer = await prisma.producer.findUnique({
      where: { cpf_cnpj },
      include: {
        crops: true,
      },
    })
    return producer
  }
  async findById(id: string): Promise<Producer | null> {
    const producer = await prisma.producer.findUnique({
      where: { id },
      include: {
        crops: true,
      },
    })
    return producer
  }

  async update(id: string, data: CreateProducerDto): Promise<Producer> {
    const {
      cpf_cnpj,
      name,
      property_name,
      city,
      state,
      total_area,
      cultivable_area,
      vegetation_area,
      cropCodes,
    } = data

    const producer = await prisma.producer.update({
      where: { id },
      data: {
        cpf_cnpj,
        name,
        property_name,
        city,
        state,
        total_area,
        cultivable_area,
        vegetation_area,
        crops: {
          set: cropCodes.map((code) => ({ code })),
        },
      },
      include: {
        crops: true,
      },
    })

    return producer
  }
  async delete(id: string): Promise<void> {
    await prisma.producer.delete({ where: { id } })
  }
}
