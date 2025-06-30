import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NfeXmlService {

  gerarXml(dados: {
    emitente: any,
    destinatario: any,
    produtos: any[],
    transporte: any,
    pagamento: any
  }): string {

    const { emitente, destinatario, produtos, transporte, pagamento } = dados;

    const xml = `
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
  <NFe>
    <infNFe versao="4.00" Id="NFe12345678901234567890123456789012345678901234">
      <ide>
        <cUF>35</cUF>
        <natOp>VENDA</natOp>
        <mod>55</mod>
        <serie>1</serie>
        <nNF>123</nNF>
        <dhEmi>${new Date().toISOString()}</dhEmi>
        <tpNF>1</tpNF>
        <idDest>1</idDest>
        <cMunFG>3550308</cMunFG>
        <tpImp>1</tpImp>
        <tpEmis>1</tpEmis>
        <cDV>0</cDV>
        <tpAmb>2</tpAmb>
        <finNFe>1</finNFe>
        <indFinal>1</indFinal>
        <indPres>1</indPres>
        <procEmi>0</procEmi>
        <verProc>1.0</verProc>
      </ide>
      <emit>
        <CNPJ>${emitente.cnpj}</CNPJ>
        <xNome>${emitente.razaoSocial}</xNome>
        <IE>${emitente.ie}</IE>
        <enderEmit>
          <xMun>${emitente.municipio}</xMun>
          <UF>${emitente.uf}</UF>
        </enderEmit>
        <CRT>${emitente.crt}</CRT>
      </emit>
      <dest>
        <CNPJ>${destinatario.cnpj}</CNPJ>
        <xNome>${destinatario.razaoSocial}</xNome>
        <indIEDest>${destinatario.indIEDest}</indIEDest>
        <IE>${destinatario.ie}</IE>
        <enderDest>
          <xMun>${destinatario.municipio}</xMun>
          <UF>${destinatario.uf}</UF>
        </enderDest>
      </dest>
      ${produtos.map((p, i) => `
      <det nItem="${i + 1}">
        <prod>
          <cProd>${p.codigo}</cProd>
          <xProd>${p.descricao}</xProd>
          <NCM>${p.ncm}</NCM>
          <CFOP>${p.cfop}</CFOP>
          <uCom>${p.unidade}</uCom>
          <qCom>${p.quantidade}</qCom>
          <vUnCom>${p.valorUnitario}</vUnCom>
          <vProd>${(p.quantidade * p.valorUnitario).toFixed(2)}</vProd>
          <vDesc>${p.desconto}</vDesc>
        </prod>
        <imposto>
          <ICMS>
            <ICMS00>
              <orig>0</orig>
              <CST>00</CST>
              <modBC>3</modBC>
              <vBC>${(p.quantidade * p.valorUnitario - p.desconto).toFixed(2)}</vBC>
              <pICMS>${p.aliquotaIcms}</pICMS>
              <vICMS>${(((p.quantidade * p.valorUnitario - p.desconto) * p.aliquotaIcms) / 100).toFixed(2)}</vICMS>
            </ICMS00>
          </ICMS>
        </imposto>
      </det>
      `).join('')}
      <transp>
        <modFrete>${transporte.modFrete}</modFrete>
        <transporta>
          <xNome>${transporte.transportadora}</xNome>
          <CNPJ>${transporte.cnpjTransportadora}</CNPJ>
        </transporta>
        <veicTransp>
          <placa>${transporte.placaVeiculo}</placa>
          <UF>${transporte.ufPlaca}</UF>
        </veicTransp>
      </transp>
      <pag>
        <detPag>
          <tPag>${pagamento.formaPagamento}</tPag>
          <vPag>${pagamento.valorPago}</vPag>
        </detPag>
        <vTroco>${pagamento.valorTroco}</vTroco>
      </pag>
    </infNFe>
  </NFe>
</nfeProc>
    `.trim();

    return xml;
  }
}
