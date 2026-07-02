export default async function handler(req, res) {
  const ICON_BASE = "🔘";
  const ICON_DETALHE = "🟡";
  const MARCA = `${ICON_BASE}${ICON_DETALHE} *BR DELIVERY EXPRESS* ${ICON_DETALHE}${ICON_BASE}`;

  // Configuração Logística Oculta por Metadados
  const TAXA_BASE = 8.00; 
  const MULTIPLICADOR = 1.30;

  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: "🏰 TORRE MASTER OPERANDO NA MATÉRIA!",
      webhook_status: "Pronto e aguardando conexão com a API do WhatsApp",
      rota: "POST para receber mensagens do chat"
    });
  }

  if (req.method === 'POST') {
    // Captura a estrutura padrão enviada pela API do WhatsApp
    // Adaptado para os principais motores do mercado (Evolution, Z-API, Baileys)
    const body = req.body;
    
    // Extrai o texto da mensagem e o número de quem enviou
    const mensagemRecebida = body.instanceData?.message?.text || body.message?.text || body.text || "";
    const numeroRemetente = body.instanceData?.from || body.from || body.phone || "";
    
    // Transforma em texto minúsculo para a IA ler sem errar
    const textoLimpo = mensagemRecebida.toLowerCase().trim();

    // MOCK DE METADADOS (Simula a leitura da torre de Feira de Santana)
    // Em produção, a IA calcula com base no IP/Prefixo da API
    const km_excedente = 0; 
    const frete_calculado = km_excedente > 0 ? TAXA_BASE + (km_excedente * 1.50 * MULTIPLICADOR) : TAXA_BASE;

    // --- FUNIL DE REAÇÃO INTELIGENTE (INTERAÇÃO REAL) ---

    // 🟩 REAÇÃO 1: FLUXO DO CLIENTE
    if (textoLimpo.includes('cliente') || textoLimpo === 'olá' || textoLimpo === 'oi') {
      return res.status(200).json({
        messaging_product: "whatsapp",
        to: numeroRemetente,
        type: "interactive",
        interactive: {
          type: "list",
          header: { type: "text", text: "🔘 BR DELIVERY - MANGABEIRA" },
          body: { text: "Sua janela de compras está pronta! Clique abaixo para abrir os corredores do nosso depósito e mercado." },
          footer: { text: "🟡 Amarelo Ouro nos Detalhes" },
          action: {
            button: "🟡 ABRIR VITRINE",
            sections: [
              {
                title: "🍉 SETOR HORTIFRUTI",
                rows: [
                  { id: "horti_frutas", title: "🔘 Frutas Frescas", description: "As melhores ofertas" },
                  { id: "horti_legumes", title: "🔘 Legumes e Verduras", description: "Selecionados para você" }
                ]
              },
              {
                title: "🍺 SETOR DEPÓSITO DE BEBIDAS",
                rows: [
                  { id: "bebida_vinho", title: "🔘 Vinhos", description: "Nacionais e Importados" },
                  { id: "bebida_whisky", title: "🔘 Whiskies", description: "Linha premium" },
                  { id: "bebida_cerveja", title: "🔘 Cervejas", description: "Trincando de gelada" }
                ]
              }
            ]
          }
        }
      });
    }

    // SIMULAÇÃO DE CLIQUE EM FINALIZAR PEDIDO NO TESTE
    if (textoLimpo.includes('fechar') || textoLimpo.includes('finalizar')) {
      const total_produtos = 45.00; // Valor simulado para teste de carrinho
      const total_geral = total_produtos + frete_calculado;

      return res.status(200).json({
        messaging_product: "whatsapp",
        to: numeroRemetente,
        type: "text",
        text: {
          body: `${MARCA}\n\n🛒 *Pedido Fechado com Sucesso!*\n\n📋 Subtotal: R$ ${total_produtos.toFixed(2)}\n🛵 Taxa de Entrega (${ICON_DETALHE}): R$ ${frete_calculado.toFixed(2)}\n\n💰 *Total Geral: R$ ${total_geral.toFixed(2)}*\n\nCopie o código Pix abaixo para pagar:\n\n\`00020101021226380014br.gov.bcb.pix...\`\n\n*Nota:* Assim que o pagamento for confirmado, o sistema abrirá a coleta da sua localização exata!`
        }
      });
    }

    // 🟨 REAÇÃO 2: FLUXO DO FORNECEDOR
    if (textoLimpo.includes('fornecedor')) {
      return res.status(200).json({
        messaging_product: "whatsapp",
        to: numeroRemetente,
        type: "text",
        text: { body: "📋 *Central do Fornecedor:* Pedido de separação recebido com sucesso. Aguardando a conferência da separadora logística." }
      });
    }

    // 🟦 REAÇÃO 3: FLUXO DO ENTREGADOR
    if (textoLimpo.includes('entregador')) {
      return res.status(200).json({
        messaging_product: "whatsapp",
        to: numeroRemetente,
        type: "text",
        text: { body: `${ICON_BASE}${ICON_DETALHE} *Cadastro Realizado!* Fique atento, você está ativo no sistema. Quando surgir corrida no seu bairro, ela já é sua!` }
      });
    }

    // Resposta padrão caso não caia em nenhum gatilho do teste
    return res.status(200).json({ sucesso: true, status: "Mensagem ignorada pelo funil." });
  }
}
