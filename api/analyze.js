export default async function handler(req, res) {
    // Разрешаем только POST запросы
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text } = req.body;

    // Твои данные из логов и скриншотов
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
                completionOptions: {
                    stream: false,
                    temperature: 0.7,
                    maxTokens: 1000
                },
                messages: [
                    {
                        role: "system",
                        text: "Ты — дерзкий и справедливый ИИ-судья. Тебе присылают текст ссоры. Твоя задача: быстро разобрать ситуацию, найти агрессора, указать на манипуляции и сказать, кто прав. Пиши коротко, по фактам и используй эмодзи. Стиль: киберпанк/хакер."
                    },
                    {
                        role: "user",
                        text: text
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.message || 'Ошибка Яндекса' });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Ошибка сервера: ' + error.message });
    }
}
