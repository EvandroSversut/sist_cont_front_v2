export class Produtos {
  id?: number;
  nomeProduto: string;
  unidade: string;
  descricao: string;
  valorUnitario: number;  // <-- adicione esta propriedade

  constructor() {
    this.id = undefined;
    this.nomeProduto = '';
    this.unidade = '';
    this.descricao = '';
    this.valorUnitario = 0; // inicialize no construtor também
  }
}
