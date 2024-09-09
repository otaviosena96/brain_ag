import { CpfCnpjValidator } from '../../../helpers/cpfCnpjValidator'
import { Crop } from '../../crops/domain/crops.model'
export class Producer {
  constructor(
    public id: string,
    public cpf_cnpj: string,
    public total_area: number,
    public cultivable_area: number,
    public vegetation_area: number,
    public state: string,
    public crops: Crop[] = [],
  ) {
    this.validateAreas()
  }

  private validateAreas() {
    if (this.cultivable_area + this.vegetation_area > this.total_area) {
      throw new Error(
        'A soma da área cultivável e da vegetação não pode ser maior que a área total.',
      )
    }
  }

  public validateCpfCnpj(): boolean {
    return CpfCnpjValidator.validateCpfCnpj(this.cpf_cnpj)
  }
}
