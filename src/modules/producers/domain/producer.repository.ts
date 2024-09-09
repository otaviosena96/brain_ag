// src/modules/producers/domain/repositories/producer.repository.ts
import { CreateProducerDto } from '../../../dtos/create-producer.dto'
import { Producer } from './producer.model'

export interface IProducerRepository {
  create(data: CreateProducerDto): Promise<Producer>
  // update(id: string, data: CreateProducerDto): Promise<Producer>
  //remove(id: string): Promise<void>
  //findById(id: string): Promise<Producer | null>
  // findAll(): Promise<Producer[]>
}
