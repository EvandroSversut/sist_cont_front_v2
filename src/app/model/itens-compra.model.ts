import { JuridicaDTO } from '../dto/juridica.dto';
import { Produtos } from './produtos.model';

export interface ItensCompra {
  id?: number;
  produto: Produtos;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}
  export interface ComprasDTO {
  pessoaJuridica: JuridicaDTO;
  dataCompra: Date;
  numeroNota: string;
  serieNota: string;
  descricaoNota: string;
  valorTotal: number;
  valorDesconto: number;
  valorIcms: number;
  itens: ItensCompra[];
}

