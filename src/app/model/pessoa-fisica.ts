import { Pessoa } from "./pessoa.model";

export interface PessoaFisica extends Pessoa {

  //id?: number;
  cpf: string;
  rg: string;
  //estadoCivil: string;
}
