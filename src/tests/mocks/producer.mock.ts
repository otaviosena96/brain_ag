import { Crop } from '@prisma/client'
import { CreateProducerDto } from '../../dtos/create-producer.dto'
import { UpdateProducerDto } from '../../dtos/update-producer.dto'
import { createError } from '../../helpers/createError'
import { CpfCnpjValidator } from '../../helpers/cpfCnpjValidator'
import { STATE_DICTIONARY } from '../../helpers/stateDictionay'

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

  static validateCreate(data: CreateProducerDto): void {
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

  static validateUpdate(data: UpdateProducerDto): void {
    if (
      data.cultivable_area !== undefined &&
      data.vegetation_area !== undefined &&
      data.total_area !== undefined
    ) {
      if (data.cultivable_area + data.vegetation_area > data.total_area) {
        throw createError(
          'A soma da área cultivável e da vegetação não pode ser maior que a área total.',
        )
      }
    }
    if (data.cpf_cnpj && !CpfCnpjValidator.validateCpfCnpj(data.cpf_cnpj)) {
      throw createError('CPF/CNPJ inválido.')
    }
    if (data.state && !STATE_DICTIONARY.has(data.state)) {
      throw createError('Sigla do estado inválida.')
    }
  }

  static fromCreateDto(dto: CreateProducerDto): Producer {
    return new Producer(
      '',
      dto.cpf_cnpj.trim(),
      dto.name,
      dto.property_name,
      dto.city,
      dto.state,
      dto.total_area,
      dto.cultivable_area,
      dto.vegetation_area,
      [],
    )
  }

  static fromUpdateDto(dto: UpdateProducerDto): Producer {
    return new Producer(
      '',
      dto.cpf_cnpj?.trim() || '',
      dto.name || '',
      dto.property_name || '',
      dto.city || '',
      dto.state || '',
      dto.total_area || 0,
      dto.cultivable_area || 0,
      dto.vegetation_area || 0,
      [],
    )
  }
}
