import { CreateProducerDto } from '../dtos/create-producer.dto'
import { UpdateProducerDto } from '../dtos/update-producer.dto'
import { createError } from '../helpers/createError'
import { Producer } from './mocks/producer.mock'
import {
  createMockData,
  initializeProducerService,
  mockProducerRepository,
} from './producerServiceTestUtils'

describe('ProducerService - Create, Update, and Delete', () => {
  let producerService = initializeProducerService()

  beforeEach(() => {
    jest.clearAllMocks()
    producerService = initializeProducerService()
  })

  it('deve criar um produtor com dados válidos', async () => {
    const mockData: CreateProducerDto = createMockData() as CreateProducerDto

    const mockProducer = Producer.fromCreateDto(mockData)

    ;(mockProducerRepository.findByCpfOrCnpj as jest.Mock).mockResolvedValue(
      null,
    )
    ;(mockProducerRepository.create as jest.Mock).mockResolvedValue(
      mockProducer,
    )

    const result = await producerService.create(mockData)

    expect(result).toEqual(mockProducer)
    expect(mockProducerRepository.findByCpfOrCnpj).toHaveBeenCalledWith(
      mockData.cpf_cnpj,
    )
    expect(mockProducerRepository.create).toHaveBeenCalledWith(mockData)
  })

  it('deve atualizar um produtor com dados válidos', async () => {
    const mockData: UpdateProducerDto = createMockData() as UpdateProducerDto

    const updatedData: UpdateProducerDto = {
      ...mockData,
      name: 'Otávio Sena Atualizado',
    }

    const existingProducer = Producer.fromUpdateDto(mockData)
    const updatedProducer = Producer.fromUpdateDto(updatedData)

    ;(mockProducerRepository.findById as jest.Mock).mockResolvedValue(
      existingProducer,
    )
    ;(mockProducerRepository.update as jest.Mock).mockResolvedValue(
      updatedProducer,
    )

    const result = await producerService.update('producer-id', updatedData)

    expect(result).toEqual(updatedProducer)
    expect(mockProducerRepository.findById).toHaveBeenCalledWith('producer-id')
    expect(mockProducerRepository.update).toHaveBeenCalledWith(
      'producer-id',
      updatedData,
    )
  })

  it('deve deletar um produtor existente', async () => {
    const mockProducer = createMockData() as CreateProducerDto

    ;(mockProducerRepository.findById as jest.Mock).mockResolvedValue(
      mockProducer,
    )
    ;(mockProducerRepository.delete as jest.Mock).mockResolvedValue(undefined)

    await producerService.delete('producer-id')

    expect(mockProducerRepository.findById).toHaveBeenCalledWith('producer-id')
    expect(mockProducerRepository.delete).toHaveBeenCalledWith('producer-id')
  })

  it('não deve deletar um produtor se não for encontrado', async () => {
    ;(mockProducerRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(
      producerService.delete('non-existent-id'),
    ).rejects.toThrowError(createError('Produtor não encontrado.', 404))
  })

  it('não deve criar produtor com CPF/CNPJ inválido', async () => {
    const mockData: CreateProducerDto = {
      ...createMockData(),
      cpf_cnpj: '12345678900',
    }

    await expect(producerService.create(mockData)).rejects.toThrowError(
      createError('CPF/CNPJ inválido.'),
    )
  })

  it('não deve atualizar produtor se não for encontrado', async () => {
    const updatedData: UpdateProducerDto = createMockData() as UpdateProducerDto

    ;(mockProducerRepository.findById as jest.Mock).mockResolvedValue(null)

    await expect(
      producerService.update('non-existent-id', updatedData),
    ).rejects.toThrowError(createError('Produtor não encontrado.', 404))
  })
})
