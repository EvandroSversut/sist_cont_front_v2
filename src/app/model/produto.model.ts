// 📁 src/app/models/produto.model.ts

/**
 * Interface que representa um Produto da NF-e
 * Cada campo corresponde a um input ou valor calculado no form
 */
export interface Produto {
  // Identificação básica
  codigo: number;         // código interno do produto
  descricao: string;      // descrição do produto
  ncm: string;            // NCM selecionado
  cfop: string;           // CFOP
  unidade: string;        // unidade de medida (ex: litro, kg, un)

  // Quantidade e valores
  quantidade: number;     // quantidade de itens
  valorUnitario: number;  // preço unitário
  desconto: number;       // valor de desconto
  vrTotalProd: number;    // valor total do produto (qtde * unitário - desconto)

  // ICMS
  origem: string;         // origem da mercadoria (0 = nacional, etc)
  cst: string | null;     // código da situação tributária
  cstSimples: string;     // CST simples nacional
  aliqIcms: number;   // alíquota de ICMS (%)
  baseDeCalculo: number;  // base de cálculo do ICMS
  vrDoIcms: number;       // valor do ICMS calculado

  // PIS/COFINS
  regimePisCofins: string; // regime de PIS/COFINS
  vrPis: number;          // valor do PIS
  vrCofins: number;       // valor do COFINS

  // Outras despesas e tributos
  vrIPI: number;            // valor do IPI (se houver)
  iss: string;            // valor do ISS (se houver)
  frete: string;          // valor do frete (se houver)
  seguro: string;         // valor do seguro (se houver)
  outrasDesp: string;     // outras despesas acessórias
}
