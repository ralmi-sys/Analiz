export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { text } = req.body;
    const YANDEX_API_KEY = 'AQVN2wvalDIjnYXVg78YcnTU1kKTItrR9CZv8BwP'; 
    const YANDEX_FOLDER_ID = 'b1gja43n76195j2h9e76';

    try {
        const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Api-Key ${YANDEX_API_KEY}`
            },
            body: JSON.stringify({
                modelUri: `gpt://${YANDEX_FOLDER_ID}/yandexgpt-lite`,
                completionOptions: { temperature: 0.7, maxTokens: 800 },
                messages: [
                    { 
                        role: "system", 
                        text: "Ты — беспристрастный ИИ-конфликтолог. Проанализируй эту переписку. Выдели, кто агрессор, есть ли манипуляции, кто прав. Дай короткий, дерзкий, но справедливый ответ с эмодзи." 
                    },
                    { role: "user", text: text }
                ]
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
