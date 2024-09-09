import { cpf, cnpj } from 'cpf-cnpj-validator'

export class CpfCnpjValidator {
  private static validators = {
    cpf: (value: string) => cpf.isValid(value),
    cnpj: (value: string) => cnpj.isValid(value),
  }

  public static validateCpf(cpfNumber: string): boolean {
    const cleanCpf = cpfNumber.replace(/\D+/g, '')
    return cleanCpf.length === 11 && this.validators.cpf(cleanCpf)
  }

  // Valida CNPJ
  public static validateCnpj(cnpjNumber: string): boolean {
    const cleanCnpj = cnpjNumber.replace(/\D+/g, '')
    return cleanCnpj.length === 14 && this.validators.cnpj(cleanCnpj)
  }

  public static validateCpfCnpj(cpfCnpjNumber: string): boolean {
    const cleanCpfCnpj = cpfCnpjNumber.replace(/\D+/g, '')
    const validator =
      cleanCpfCnpj.length === 11 ? this.validators.cpf : this.validators.cnpj
    return cleanCpfCnpj.length === 11 || cleanCpfCnpj.length === 14
      ? validator(cleanCpfCnpj)
      : false
  }
}
