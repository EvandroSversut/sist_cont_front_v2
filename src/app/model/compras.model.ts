import { PessoaJuridica } from './pessoa-juridica';
import { ItensCompra } from './itens-compra.model';

export interface Compras {
  id?: number;
  pessoaJuridica: PessoaJuridica;
  dataCompra: Date;
  numeroNota: string;
  serieNota: string;
  descricaoNota: string;
  valorTotal: number;
  valorDesconto: number;
  valorIcms: number;
  itens: ItensCompra[];
}
