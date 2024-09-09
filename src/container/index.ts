import { container } from 'tsyringe'
import { IProducerRepository } from '../modules/producers/domain/producer.repository'
import { ProducerRepository } from '../modules/producers/infra/prisma /producerPrisma.repository'

// Registra o ProducerRepository como singleton para a interface IProducerRepository
container.registerSingleton<IProducerRepository>(
  'ProducerRepository',
  ProducerRepository,
)
