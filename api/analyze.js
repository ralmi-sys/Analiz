export default async function handler(req, res) {
    const { text } = req.body;
    try {
        const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Api-Key AQVN2wvalDIjnYXVg78YcnTU1kKTItrR9CZv8BwP`
            },
            body: JSON.stringify({
                modelUri: `gpt://b1gja43n76195j2h9e76/yandexgpt-lite`,
                completionOptions: { temperature: 0.7, maxTokens: 800 },
                messages: [{ role: "user", text: "Проанализируй ссору: " + text }]
            })
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
