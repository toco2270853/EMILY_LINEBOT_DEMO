// api/order.js —— Vercel 後端中繼，把訂單轉發給你的 EMILY server
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const order = req.body; // Vercel 會自動把 JSON body 解析好

    // 伺服器對伺服器轉發，用 application/json，EMILY 就能正常解析 body
    await fetch('https://polymerous-domenic-dovish.ngrok-free.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(order)
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('轉發失敗:', err);
    return res.status(502).json({ ok: false, error: String(err) });
  }
}