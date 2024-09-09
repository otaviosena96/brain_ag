import { CreateProducerDto } from '../../../dtos/create-producer.dto'
import { Producer } from './producer.model'

export interface IProducerRepository {
  create(data: CreateProducerDto): Promise<Producer>
  findByCpfOrCnpj(cpf_cnpj: string): Promise<Producer | null>
  update(id: string, data: CreateProducerDto): Promise<Producer>
  findById(id: string): Promise<Producer | null>
  delete(id: string): Promise<void>
}
