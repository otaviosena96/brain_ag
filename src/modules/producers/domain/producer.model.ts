import { CreateProducerDto } from '../../../dtos/create-producer.dto'
import { CpfCnpjValidator } from '../../../helpers/cpfCnpjValidator'
import { createError } from '../../../helpers/createError'
import { STATE_DICTIONARY } from '../../../helpers/stateDictionay'
import { Crop } from '../../crops/domain/crops.model'

export class Producer {
  constructor(
    public id: string,
    public cpf_cnpj: string,
    public name: string,
    public property_name: string,
    public city: string,
    public state: string,
    public total_area: number,
    public cultivable_area: number,
    public vegetation_area: number,
    public crops: Crop[],
  ) {}

  static validate(data: CreateProducerDto): void {
    if (data.cultivable_area + data.vegetation_area > data.total_area) {
      throw createError(
        'A soma da área cultivável e da vegetação não pode ser maior que a área total.',
      )
    }
    if (!CpfCnpjValidator.validateCpfCnpj(data.cpf_cnpj)) {
      throw createError('CPF/CNPJ inválido.')
    }

    if (!STATE_DICTIONARY.has(data.state)) {
      throw createError('Sigla do estado inválida.')
    }
  }

  static validation(data: CreateProducerDto): Producer {
    this.validate(data)
    return new Producer(
      '',
      data.cpf_cnpj.trim(),
      data.name,
      data.property_name,
      data.city,
      data.state,
      data.total_area,
      data.cultivable_area,
      data.vegetation_area,
      [],
    )
  }
}
