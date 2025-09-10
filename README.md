# 🤖 Geração Automatizada de User Stories com IA (via Google Colab)

Este repositório contém um projeto desenvolvido em **Google Colab** que utiliza **inteligência artificial (GPT)** para gerar automaticamente:

- 📌 User Stories  
- ✅ Critérios de Aceitação  
- 🧪 Cenários de Teste (BDD)  
- 🧠 Análise de Contexto a partir do input do Product Owner  

O sistema é dividido em **4 módulos (agentes)** baseados em prompts, cada um responsável por uma etapa da especificação de requisitos para produtos digitais.

---

## ⚙️ Módulos Implementados

### 1. 🧠 Analisador de Contexto

Responsável por interpretar o input fornecido pelo Product Owner e extrair os principais elementos da user story.

Esse módulo transforma solicitações soltas em dados estruturados para alimentar os próximos agentes.

### 2. ✍️ Gerador de User Story
Gera uma user story no formato padrão:

Como [persona], quero [ação], para que [benefício]
Foco em clareza, concisão e centralidade no usuário.

### 3. ✅ Gerador de Critérios de Aceitação
A partir da user story, cria critérios objetivos e testáveis:

Usa linguagem simples e clara

Exemplo: Deve ser possível selecionar um intervalo de datas

### 4. 🧪 Gerador de Cenários de Teste (BDD)
Converte os critérios de aceitação em cenários de teste no formato Gherkin (Given / When / Then):

Cenário: Filtrar por data e categoria  
Dado que o usuário acessa a tela de relatórios  
Quando seleciona uma data e uma categoria  
Então os dados exibidos devem refletir os filtros aplicados  
Compatível com ferramentas como Cucumber, Behave, SpecFlow, etc.

---

## 🌐 Interface Web

Um exemplo simples de front-end foi adicionado em `web/` utilizando **HTML**, **TailwindCSS** e **JavaScript**. A página permite informar a chave da API do Google, descrever o contexto desejado e acionar a geração das user stories diretamente pelo navegador.

Para utilizar, basta abrir o arquivo `web/index.html` em um navegador moderno, preencher os campos e clicar em **Gerar**.

O script utiliza a API do Gemini pela rota `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent` e envia a chave no cabeçalho `x-goog-api-key`.
