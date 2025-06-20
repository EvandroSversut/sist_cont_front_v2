import { Produtos } from './produtos.model';

export interface ItensCompra {
  id?: number;
  produto: Produtos;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}
