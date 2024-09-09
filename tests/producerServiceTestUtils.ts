import { CreateProducerDto } from '../src/dtos/create-producer.dto'
import { IProducerRepository } from '../src/modules/producers/domain/producer.repository'
import { ProducerService } from '../src/modules/producers/services/producers.service'

export const mockProducerRepository: Partial<IProducerRepository> = {
  findById: jest.fn(),
  findByCpfOrCnpj: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

export const createMockData = (): CreateProducerDto => ({
  cpf_cnpj: '00986447188',
  name: 'Otávio Sena',
  property_name: 'Fazenda do Otávio',
  city: 'Campo Grande',
  state: 'MS',
  total_area: 100,
  cultivable_area: 50,
  vegetation_area: 20,
  cropCodes: [1, 2, 3],
})

export const initializeProducerService = (): ProducerService => {
  return new ProducerService(mockProducerRepository as IProducerRepository)
}
