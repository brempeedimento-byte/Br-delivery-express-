export default async function handler(req, res) {
  // Configuração Visual Oficial: Cinza (Predominante) e Amarelo Cor de Ouro (Detalhe)
  const ICON_BASE = "🔘";
  const ICON_DETALHE = "🟡";
  const MARCA = `${ICON_BASE}${ICON_DETALHE} *BR DELIVERY EXPRESS* ${ICON_DETALHE}${ICON_BASE}`;

  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: "🏰 TORRE MASTER OPERANDO NA MATÉRIA!",
      design_janela: "Layout de Menu Interativo (WhatsApp API) Ativo",
      paleta: "Predominante Cinza com Detalhes Amarelo Ouro"
    });
  }

  if (req.method === 'POST') {
    const { tipo_usuario, acao, etapa, total_produtos, metadados_contato } = req.body;

    const TAXA_BASE = 8.00; 
    const MULTIPLICADOR = 1.30; 
    const km_excedente = metadados_contato?.distancia_estimada_km || 0;
    const frete_calculado = km_excedente > 0 ? TAXA_BASE + (km_excedente * 1.50 * MULTIPLICADOR) : TAXA_BASE;

    if (tipo_usuario === 'cliente') {
      
      // ETAPA 2.2: O Disparo da Janela Flutuante (Estrutura de Menu do WhatsApp)
      if (etapa === '2.2_abrir_janela') {
        return res.status(200).json({
          to: req.body.from,
          type: "interactive",
          interactive: {
            type: "list",
            header: { type: "text", text: "🔘 BR DELIVERY - MANGABEIRA" },
            body: { text: "Sua janela de compras está pronta! Clique no botão abaixo para abrir os corredores do nosso depósito e mercado." },
            footer: { text: "🟡 Amarelo Ouro nos Detalhes • Total Segurança" },
            action: {
              button: "🟡 ABRIR VITRINE",
              sections: [
                {
                  title: "🍉 SETOR HORTIFRUTI",
                  rows: [
                    { id: "horti_frutas", title: "🔘 Frutas Frescas", description: "Veja as ofertas do dia" },
                    { id: "horti_legumes", title: "🔘 Legumes e Verduras", description: "Selecionados para você" }
                  ]
                },
                {
                  title: "🍺 SETOR DEPÓSITO DE BEBIDAS",
                  rows: [
                    { id: "bebida_vinho", title: "🔘 Vinhos", description: "Nacionais e Importados" },
                    { id: "bebida_whisky", title: "🔘 Whiskies", description: "Altíssima performance" },
                    { id: "bebida_cerveja", title: "🔘 Cervejas", description: "Trincando de gelada" }
                  ]
                }
              ]
            }
          }
        });
      }

      // Etapa 2.5: Fechamento da Compra (Sumiço da janela e entrega do Pix)
      if (acao === 'finalizar_pedido') {
        const total_geral = parseFloat(total_produtos || 0) + frete_calculado;
        return res.status(200).json({
          sucesso: true,
          comando_whatsapp: "CLOSE_WINDOW_AND_SEND_TEXT",
          resposta_whatsapp: `${MARCA}\n\n🛒 *Pedido Fechado!* A vitrine flutuante foi recolhida.\n\n📋 Subtotal: R$ ${parseFloat(total_produtos).toFixed(2)}\n🛵 Taxa de Entrega (${ICON_DETALHE}): R$ ${frete_calculado.toFixed(2)}\n\n💰 *Total Geral: R$ ${total_geral.toFixed(2)}*\n\nCopie o código Pix abaixo para pagar. Após a confirmação, coletaremos sua localização de entrega!`,
          pix_copia_e_cola: "00020101021226380014br.gov.bcb.pix..."
        });
      }
    }

    return res.status(200).json({ sucesso: true });
  }
}
