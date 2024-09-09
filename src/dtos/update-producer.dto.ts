import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  IsArray,
} from 'class-validator'

export class UpdateProducerDto {
  @IsString()
  @IsOptional()
  cpf_cnpj?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  property_name?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  state?: string

  @IsNumber()
  @IsOptional()
  @IsPositive()
  total_area?: number

  @IsNumber()
  @IsOptional()
  @IsPositive()
  cultivable_area?: number

  @IsNumber()
  @IsOptional()
  @IsPositive()
  vegetation_area?: number

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  cropCodes?: number[]
}
