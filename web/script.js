async function callGemini(apiKey, messages) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const body = {
        contents: messages.map(m => ({role: 'user', parts: [{text: m}]}))
    };
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('API error');
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
