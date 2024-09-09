import { inject, injectable } from 'tsyringe'
import { IProducerRepository } from '../domain/producer.repository'
import { CreateProducerDto } from '../../../dtos/create-producer.dto'
import { Producer } from '../domain/producer.model'
import { createError } from '../../../helpers/createError'
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
    Producer.validation(data)
    const producerExisting = await this.producerRepository.findByCpfOrCnpj(
      data.cpf_cnpj,
    )
    if (producerExisting) {
      throw createError('CPF ou CNPJ já cadastrado.', 409)
    }
    return this.producerRepository.create(data)
  }

  async update(id: string, data: CreateProducerDto): Promise<Producer> {
    data.state = data.state.trim().toUpperCase()
    data.cpf_cnpj = data.cpf_cnpj.trim().replace(/\D+/g, '')

    const producerExistingByCpf = await this.producerRepository.findByCpfOrCnpj(
      data.cpf_cnpj,
    )
    const producerExisting = await this.producerRepository.findById(id)
    if (producerExisting === null) {
      throw createError('Produtor não encontrado.', 404)
    }
    console.log(producerExisting)
    console.log(producerExistingByCpf)
    if (producerExistingByCpf !== null && producerExistingByCpf.id !== id) {
      console.log('oi')
      throw createError('CPF ou CNPJ já está cadastrado.', 403)
    }

    Producer.validation(data)

    return this.producerRepository.update(id, data)
  }
  async delete(id: string): Promise<void> {
    const producerExisting = await this.producerRepository.findById(id)

    if (producerExisting === null) {
      throw createError('Produtor não encontrado.', 404)
    }

    await this.producerRepository.delete(id)
  }
}
