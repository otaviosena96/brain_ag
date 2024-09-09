import { CreateProducerDto } from '../../src/dtos/create-producer.dto'
import { Producer } from '../../src/modules/producers/domain/producer.model'

export const mockProducer = Producer.validation as jest.MockedFunction<
  typeof Producer.validation
>

mockProducer.mockImplementation((data: CreateProducerDto) => ({
  ...data,
  id: 'mocked-id',
  crops: [],
}))
