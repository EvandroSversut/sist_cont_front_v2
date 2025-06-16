import { Acesso } from "./acesso.model";
import { PessoaFisica } from "./pessoa-fisica";


export interface Usuario {
  id?: number;
  email: string;
  senha: string;
  pessoaFisica: PessoaFisica;
  acessos?: Acesso[];
  dataCriacao?: Date;
  ativo?: boolean;
}


