export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: "🏰 TORRE MASTER OPERANDO NA MATÉRIA!",
      mensagem: "Wesley, os motores da BR Delivery Express estão ligados no canal certo!" 
    });
  }
}
