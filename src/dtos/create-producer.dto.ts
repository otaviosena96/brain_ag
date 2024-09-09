import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsArray,
} from 'class-validator'

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  cpf_cnpj!: string

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  property_name!: string

  @IsString()
  @IsNotEmpty()
  city!: string

  @IsString()
  @IsNotEmpty()
  state!: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  total_area!: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  cultivable_area!: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  vegetation_area!: number

  @IsArray()
  @IsNumber({}, { each: true })
  cropCodes!: number[]
}
