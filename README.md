<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/35595be3-2553-42fa-a16f-803273127b63

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## ✨ Atividades Adaptadas (PEIs) — `/atividades-adaptadas`

Página **pública** (sem login) onde os professores selecionam um estudante
neurodivergente, informam o tema da aula e a IA gera uma **atividade
adaptada individualizada** com base no PEI, com download em PDF e DOCX.

### Configuração no Vercel

**Settings → Environment Variables** — adicione (escopo: Production + Preview + Development):

| Variável | Onde é usada | Valor |
|---|---|---|
| `ANTHROPIC_API_KEY` | servidor (`api/`) | `sk-ant-api03-...` (gerada em https://console.anthropic.com/settings/keys) |
| `ACCESS_PASSCODE` | servidor (`api/`) | código da equipe (ex.: `fjpn-2025`). Se vazio, gate fica desligado. |
| `VITE_ACCESS_PASSCODE` | bundle do navegador | **mesmo valor** de `ACCESS_PASSCODE`. Embutido em build-time. |

> ⚠️ **Por que duas variáveis pro passcode:**
> - `VITE_ACCESS_PASSCODE` controla a tela de bloqueio (UX). Visível no bundle.
> - `ACCESS_PASSCODE` é a validação **real** no servidor — sem ela, a IA não responde mesmo se alguém tentar bypassar a UI.
> - Os valores devem ser iguais.

Depois: **Deployments → Redeploy** (sem cache). O passcode fica memorizado no navegador do professor por 30 dias.

### Estrutura

| Caminho | O que é |
|---|---|
| `data_students_neuro.ts` | Banco dos 20 estudantes (extraído dos PEIs) |
| `api/generate-adapted-activity.ts` | Vercel Function que chama o Claude |
| `services/adaptedActivityService.ts` | Cliente frontend + histórico (localStorage) |
| `services/adaptedActivityExport.ts` | Export PDF (jsPDF + html2canvas) e DOCX (`docx`) |
| `components/AdaptedActivities/` | Renderizadores lúdicos: caça-palavras, cruzadinha, blocos |
| `screens/AdaptedActivities.tsx` | Galeria → Builder → Resultado |

### Atualizar dados de um estudante

Edite o array `NEURO_STUDENTS` em `data_students_neuro.ts`. Os campos
`interests`, `barriers`, `strengths` e `adaptations` são os que **mais
influenciam a saída da IA** — quanto mais específicos, melhor.

### LGPD ⚠️

A página é pública por design (decisão do solicitante). Os PEIs contêm
dados sensíveis de menores. Recomendações:
- Compartilhar o link **apenas internamente** com a equipe pedagógica.
- Considere adicionar um passcode simples (env var + check no builder)
  ou hospedar em domínio com IP-allowlist da rede da escola.
- Para exposição externa, anonimizar (substituir sobrenomes por iniciais).
