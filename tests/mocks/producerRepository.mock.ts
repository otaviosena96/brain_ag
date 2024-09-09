import { IProducerRepository } from '../../src/modules/producers/domain/producer.repository'

export const mockProducerRepository: Partial<IProducerRepository> = {
  findByCpfOrCnpj: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
}
