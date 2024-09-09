import { inject, injectable } from 'tsyringe'
import { IProducerRepository } from '../domain/producer.repository'
import { CreateProducerDto } from '../../../dtos/create-producer.dto'
import { Producer } from '../domain/producer.model'
import { createError } from '../../../helpers/createError'
import { UpdateProducerDto } from '../../../dtos/update-producer.dto'
@injectable()
export class ProducerService {
  private producerRepository: IProducerRepository

  constructor(
    @inject('ProducerRepository') producerRepository: IProducerRepository,
  ) {
    this.producerRepository = producerRepository
  }

  async create(data: CreateProducerDto): Promise<Producer> {
    data.state = data.state.trim().toUpperCase()
    data.cpf_cnpj = data.cpf_cnpj.trim().replace(/\D+/g, '')
    Producer.validateCreate(data)
    const producerExisting = await this.producerRepository.findByCpfOrCnpj(
      data.cpf_cnpj,
    )
    if (producerExisting) {
      throw createError('CPF ou CNPJ já cadastrado.', 409)
    }
    return this.producerRepository.create(data)
  }

  async update(id: string, data: UpdateProducerDto): Promise<Producer> {
    const existingProducer = await this.producerRepository.findById(id)
    if (!existingProducer) {
      throw createError('Produtor não encontrado.', 404)
    }

    if (data.cpf_cnpj) {
      const producerExistingByCpf =
        await this.producerRepository.findByCpfOrCnpj(data.cpf_cnpj)
      if (producerExistingByCpf && producerExistingByCpf.id !== id) {
        throw createError('CPF ou CNPJ já está cadastrado.', 403)
      }
      data.cpf_cnpj = data.cpf_cnpj.trim().replace(/\D+/g, '')
    }

    if (data.state) {
      data.state = data.state.trim().toUpperCase()
    }

    Producer.validateUpdate({
      ...existingProducer,
      ...data,
    })

    return this.producerRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const producerExisting = await this.producerRepository.findById(id)

    if (producerExisting === null) {
      throw createError('Produtor não encontrado.', 404)
    }

    await this.producerRepository.delete(id)
  }

  async getById(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findById(id)

    if (producer === null) {
      throw createError('Produtor não encontrado.', 404)
    }

    return producer
  }
}
