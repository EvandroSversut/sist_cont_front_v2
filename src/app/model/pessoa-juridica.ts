import { Pessoa } from "./pessoa.model";

export interface PessoaJuridica extends Pessoa {

  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscEstadual: string;
  inscMunicipal: string;
 

}
  
