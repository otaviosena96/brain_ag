// src/modules/producers/infra/prisma/producer.repository.ts
import { PrismaClient } from '@prisma/client'
import { CreateProducerDto } from '../../../../dtos/create-producer.dto'
import { IProducerRepository } from '../../domain/producer.repository'
import { Producer } from '../../domain/producer.model'
import { injectable } from 'tsyringe'

const prisma = new PrismaClient()

@injectable()
export class ProducerRepository implements IProducerRepository {
  async create(data: CreateProducerDto): Promise<Producer> {
    const producer = await prisma.producer.create({
      data: {
        ...data,
        crops: {
          connect: data.cropCodes.map((code) => ({ code })),
        },
      },
      include: {
        crops: true,
      },
    })
    const newProducer = new Producer(
      producer.id,
      producer.cpf_cnpj,
      producer.total_area,
      producer.cultivable_area,
      producer.vegetation_area,
      producer.state,
      producer.crops, // Inclui as culturas associadas
    )
    return newProducer
  }
}
