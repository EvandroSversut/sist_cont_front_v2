
export interface PessoaUsuarioDTO {
  idPessoaFisica?: number;
  idUsuario?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  cpf: string;
  rg: string;
}
