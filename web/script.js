async function callGemini(apiKey, messages) {
    // Use the stable v1 endpoint and send the API key via header
    const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
    const body = {
        contents: messages.map(m => ({ role: 'user', parts: [{ text: m }] }))
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        let msg = `API error (${res.status})`;
        try {
            const errData = await res.json();
            msg += `: ${errData.error?.message || JSON.stringify(errData)}`;
        } catch { /* ignore */ }
        throw new Error(msg);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
}

async function generate() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const context = document.getElementById('context').value.trim();
    const output = document.getElementById('output');

    output.innerHTML = '';

    if (!apiKey || !context) {
        alert('Informe a API key e o contexto.');
        return;
    }

    try {
        const append = (title, text) => {
            const section = document.createElement('div');
            section.innerHTML = `<h2 class="text-xl font-semibold mb-2">${title}</h2><pre class="bg-gray-100 p-2 rounded whitespace-pre-wrap">${text}</pre>`;
            output.appendChild(section);
        };

        const ctxAnalysisPrompt = `Você é um analista de produto. Analise o seguinte contexto e extraia persona, ação e benefício.\nContexto: ${context}`;
        const ctxAnalysis = await callGemini(apiKey, [ctxAnalysisPrompt]);
        append('Análise de Contexto', ctxAnalysis);

        const userStoryPrompt = `Com base no contexto analisado, gere user stories no formato: Como [persona], quero [ação], para que [benefício].\nContexto Analisado: ${ctxAnalysis}`;
        const userStories = await callGemini(apiKey, [userStoryPrompt]);
        append('User Stories', userStories);

        const criteriaPrompt = `A partir das user stories a seguir, gere critérios de aceitação claros:\nUser Stories: ${userStories}`;
        const criteria = await callGemini(apiKey, [criteriaPrompt]);
        append('Critérios de Aceitação', criteria);

        const scenarioPrompt = `Usando os critérios de aceitação, escreva cenários de teste BDD no formato Given/When/Then.\nCritérios: ${criteria}`;
        const scenarios = await callGemini(apiKey, [scenarioPrompt]);
        append('Cenários de Teste', scenarios);
    } catch (err) {
        alert('Erro ao gerar conteúdo: ' + err.message);
    }
}

document.getElementById('generate').addEventListener('click', generate);
