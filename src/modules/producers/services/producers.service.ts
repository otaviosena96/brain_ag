import { inject, injectable } from 'tsyringe'
import { IProducerRepository } from '../domain/producer.repository'
import { CreateProducerDto } from '../../../dtos/create-producer.dto'
import { Producer } from '../domain/producer.model'

@injectable()
export class ProducerService {
  private producerRepository: IProducerRepository

  constructor(
    @inject('ProducerRepository') producerRepository: IProducerRepository,
  ) {
    this.producerRepository = producerRepository
  }

  async create(data: CreateProducerDto): Promise<Producer> {
    return this.producerRepository.create(data)
  }
}
