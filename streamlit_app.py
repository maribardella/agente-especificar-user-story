import streamlit as st

# Funções de placeholder para os agentes

def agente_analisador_contexto(contexto: str) -> str:
    """Simula a análise de contexto."""
    return f"Análise de contexto para: {contexto}"


def agente_gerador_user_stories(contexto: str, contexto_analisado: str) -> str:
    """Simula a geração de user stories."""
    return f"Como usuário, quero {contexto} para obter determinado benefício."


def agente_gerador_criterios(contexto: str, contexto_analisado: str, user_stories: str) -> str:
    """Simula a geração de critérios de aceitação."""
    return "- O sistema deve ...\n- Deve ser possível ..."


def agente_gerador_cenario(contexto: str, contexto_analisado: str, user_stories: str, criterios: str) -> str:
    """Simula a geração de cenários de teste."""
    return "Cenário: Exemplo\nDado que ...\nQuando ...\nEntão ..."


st.title("Geração automatizada de User Stories")

contexto = st.text_area("Contexto fornecido pelo Product Owner")
executar = st.button("Executar agentes")

if executar and contexto:
    st.header("1. Análise de Contexto")
    contexto_analisado = agente_analisador_contexto(contexto)
    st.write(contexto_analisado)

    st.header("2. User Story")
    user_story = agente_gerador_user_stories(contexto, contexto_analisado)
    st.write(user_story)

    st.header("3. Critérios de Aceitação")
    criterios = agente_gerador_criterios(contexto, contexto_analisado, user_story)
    st.write(criterios)

    st.header("4. Cenários de Teste (BDD)")
    cenarios = agente_gerador_cenario(contexto, contexto_analisado, user_story, criterios)
    st.write(cenarios)
elif executar and not contexto:
    st.warning("Por favor, insira um contexto antes de executar.")
