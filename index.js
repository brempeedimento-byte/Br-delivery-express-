export default async function handler(req, res) {
  // Configuração Visual Oficial: Cinza e Amarelo Cor de Ouro
  const ICON_BASE = "🔘";
  const ICON_DETALHE = "🟡";
  const MARCA = `${ICON_BASE}${ICON_DETALHE} *BR DELIVERY EXPRESS* ${ICON_DETALHE}${ICON_BASE}`;

  // RECONHECIMENTO DE ENTRADA: MODELO DE REAÇÃO (GET)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: "🏰 TORRE MASTER OPERANDO NA MATÉRIA!",
      estrutura_holograma: "Aprovada e Pronta para Recheio",
      gavetas: ["Funil de Reação", "Labirinto do Cliente", "Canal Fornecedor", "Central Entregador"],
      identidade: "Cinza e Amarelo Ouro no detalhe"
    });
  }

  // PROCESSAMENTO DAS GAVETAS DO SISTEMA (POST)
  if (req.method === 'POST') {
    const { tipo_usuario, acao, etapa, total_produtos, metadados_contato } = req.body;

    // ==========================================
    // GAVETA 1: FUNIL DE REAÇÃO TRIPLO & METADADOS
    // ==========================================
    const TAXA_BASE = 8.00; // Mangabeira Base
    const MULTIPLICADOR = 1.30; // +30% Justo por Km excedente via Metadados
    const km_excedente = metadados_contato?.distancia_estimada_km || 0;
    const frete_calculado = km_excedente > 0 ? TAXA_BASE + (km_excedente * 1.50 * MULTIPLICADOR) : TAXA_BASE;

    // ==========================================
    // GAVETA 2: LABIRINTO DO CLIENTE
    // ==========================================
    if (tipo_usuario === 'cliente') {
      
      // Etapa 2.3: Menu Raiz (Central de Compras na Janela Flutuante)
      if (etapa === '2.3') {
        return res.status(200).json({
          status: "Menu Raiz Ativo",
          painel_inferior: {
            subtotal_produtos: parseFloat(total_produtos || 0).toFixed(2),
            frete_invisivel: frete_calculado.toFixed(2),
            total_geral: (parseFloat(total_produtos || 0) + frete_calculado).toFixed(2)
          },
          opcoes: ["1. Setor Hortifruti", "2. Setor Bebidas", "3. Botão Finalizar Pedido"]
        });
      }

      // Etapa 2.5 & 2.6: O Estalo (Fechamento e Pós-Venda)
      if (acao === 'finalizar_pedido') {
        const total_geral = parseFloat(total_produtos || 0) + frete_calculado;
        return res.status(200).json({
          sucesso: true,
          fechar_janela_flutuante: true,
          resposta_whatsapp: `${MARCA}\n\n🛒 *Pedido Fechado com Sucesso!*\n\n📋 Subtotal: R$ ${parseFloat(total_produtos).toFixed(2)}\n🛵 Taxa de Entrega: R$ ${frete_calculado.toFixed(2)}\n\n💰 *Total Geral: R$ ${total_geral.toFixed(2)}*\n\nCopie o código Pix abaixo para pagar. \n\n*Nota:* Assim que o pagamento for confirmado, o sistema solicitará sua Localização Exata para despacho imediato!`,
          pix_copia_e_cola: "00020101021226380014br.gov.bcb.pix...",
          liberar_pos_venda: "Aguardando confirmação no Supabase para disparar Etapa 2.6 (Captura de Localização)"
        });
      }
    }

    // ==========================================
    // GAVETA 3: CANAL DO FORNECEDOR
    // ==========================================
    if (tipo_usuario === 'fornecedor') {
      return res.status(200).json({
        sucesso: true,
        acao: "Aviso de Coleta",
        mensagem: "Venda realizada! Pacotes prontos para triagem com a Separadora."
      });
    }

    // ==========================================
    // GAVETA 4: CENTRAL DO ENTREGADOR (SILENCIOSO)
    // ==========================================
    if (tipo_usuario === 'entregador' && acao === 'cadastro') {
      return res.status(200).json({
        sucesso: true,
        mensagem: `${ICON_BASE}${ICON_DETALHE} *Cadastro Realizado!* Fique atento, você está ativo no sistema. Quando surgir corrida no seu bairro, ela já é sua!`
      });
    }

    return res.status(200).json({ sucesso: true, status: "Aguardando gatilho de reação." });
  }
}
