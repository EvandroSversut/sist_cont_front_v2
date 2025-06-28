import { JuridicaDTO } from '../dto/juridica.dto';
import { Produtos } from './produtos.model';

export interface ItensCompra {
  id?: number;
  produto: { id: number };
  quantidade: number;
  valorUnitario: number;
  desconto: number;
  valorTotal: number;
}
  export interface ComprasDTO {
  pessoaJuridica: { id: number };
  dataCompra: Date;
  numeroNota: string;
  serieNota: string;
  descricaoNota: string;
  valorTotal: number;
  valorDesconto: number;
  valorIcms: number;
  itens: ItensCompra[];
}


