/*
essa interface PessoaUsuario que criamos no Angular não é uma model do banco, 
nem substitui suas entidades Pessoa, PessoaFisica, Usuario, etc.
Ela é apenas um objeto de transporte de dados (um DTO no front), 
feito para juntar os dados de PessoaFisica e Usuario em uma 
requisição única para o back-end.
Aqui não está “unificando entidades”. Está preenchendo uma única tela
 com campos que pertencem a classes diferentes no back-end, 
 e o back trata disso corretamente.
*/


export interface PessoaUsuario {
  email: string;      // vem da classe usuario
  senha: string;      // vem da classe usuario
  nome: string;        // vem da classe pessoa
  cpf: string;         // vem da classe pessoafisica
  //rg: string;          // vem da classe pessoafisica
  telefone: string;    // vem da classe pessoa
  //rua: string;         // vem da classe pessoa
  //numero: string;      // vem da classe pessoa
  //complemento: string; // vem da classe pessoa
  //bairro: string;      // vem da classe pessoa
  //cep: string;         // vem da classe pessoa
  //cidade: string;      // vem da classe pessoa
 // uf: string;          // vem da classe pessoa
  // email - login     
  
}
