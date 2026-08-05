# Curso "Graph Engineering — de loops a grafos" (id: `loopgraph`)

Formato INEMA **formato-curso-v2**. Self-contained, abre em `file://`.
5 trilhas × 3 módulos × 6 tópicos = **90 tópicos**.

## Fonte
- Transcrição do vídeo "Larguei tudo pra aprender Graph Engineering" (youtube.com/watch?v=IYV_rqQpwcA)
- Pesquisa: Prefect (loops vs graphs), Turingpost FOD#159, AI Builder Club (graph vs loop),
  explainx.ai (multi-agent orgs), Carlos E. Perez (Medium), LangGraph/ADK docs.

## Frase-âncora do curso
> "Um loop já é um grafo — um grafo cujo caminho volta a um nó anterior."
> Você não gradua de loops para grafos; você **compõe** loops em grafos quando um loop
> deixa de bastar — e paga em prompts, state schema e novos modos de falha.

## Estrutura

| Trilha | Cor | Módulos |
|---|---|---|
| T1 Fundamentos: o grafo | emerald | 1-1 O que é um grafo · 1-2 Grafos no mundo real · 1-3 Como se anda num grafo |
| T2 Loop Engineering | blue | 2-1 Anatomia do loop · 2-2 O verificador é o gargalo · 2-3 Onde o loop quebra |
| T3 Agentic × Loop × Graph | purple | 3-1 As cinco camadas · 3-2 O comparativo de verdade · 3-3 Mito × fato |
| T4 Graph Eng. na prática | amber | 4-1 Nós, arestas e estado · 4-2 Org graph × work graph · 4-3 Falhas, harness, observabilidade |
| T5 Mão na massa | teal | 5-1 Do loop ao grafo · 5-2 Grafos de negócio e de tarefas · 5-3 Biblioteca de prompts |

## Assets compartilhados
- `assets/learn.css` + `assets/learn.js` — camada de aprendizagem v2 (copiados da skill)
- `assets/curso.css` — base v1 + light mode completo (5 acentos) + bordas dark + SVG light + pulso
- `doc/_template.html` — head canônico + nav + footer (trocar `{{REL}}`)

Em cada página: anti-FOUC **inline no topo do head**, manifesto `data-inema-manifest`
**idêntico**, `INEMA.init()` no fim. `REL` = `.` na landing, `../..` nas páginas de curso.

## SVG por módulo (evitar repetir o mesmo primitivo)
- 1-1: nós soltos · nós+arestas · manhã com pesos · DAG × ciclo
- 1-2: cadeia social · funil com efeito colateral · backlog com dependência cruzada
- 1-3: BFS × DFS · ordem topológica · níveis de paralelismo
- 2-1: ciclo discover→plan→act→verify→stop
- 2-2: verificador como gargalo (funil)
- 2-3: **malha × solo** (loops colidindo) + medição decaindo
- 3-1: **escada** das 5 camadas (prompt→contexto→harness→loop→grafo)
- 3-2: **profundidade × largura** (loop sequencial × fan-out) + daily brief nos 3 formatos
- 3-3: tabela mito × fato + **aninhamento** (um loop é um nó do grafo)
- 4-1: nós/arestas/estado + **equação** loop + loop + state = grafo
- 4-2: org graph × work graph · zone defense
- 4-3: **monitor mock** (observabilidade) + modos de falha
- 5-1: migração loop → grafo (antes/depois)
- 5-2: grafo de negócio multi-métrica + backlog
- 5-3: **fluxo de decisão** (loop ou grafo?)

## Imagens
6 diagramas fornecidos pelo usuário. Originais em `doc/imagens-originais/`, cópias com nome
estável em `assets/img/`. Mapa completo de uso em **`doc/IMAGENS.md`**. `capa/capa.png` =
`graph-engineering-panorama.png`.

## Status
- [x] `assets/` (learn.css, learn.js, curso.css)
- [x] `assets/img/` + `capa/capa.png` + `doc/IMAGENS.md`
- [x] `doc/_template.html`
- [x] `index.html` (landing, hero SVG loop→grafo, medidores, capa)
- [x] `curso/trilha1/index.html`
- [x] `curso/trilha1/modulo-1-1.html`
- [x] `curso/trilha1/modulo-1-2.html`
- [x] `curso/trilha1/modulo-1-3.html` — **Trilha 1 COMPLETA**
- [x] `curso/trilha2/index.html`
- [x] trilha2: 2-1, 2-2, 2-3 — **Trilha 2 COMPLETA**
- [x] trilha3: index + 3-1, 3-2, 3-3 — **Trilha 3 COMPLETA**
- [x] `curso/trilha4/index.html`
- [ ] trilha4: 4-1, 4-2, 4-3
- [x] `curso/trilha5/index.html`
- [ ] trilha5: 5-1, 5-2, 5-3
- [x] `doc/auditar.mjs` — auditoria automática (`node doc/auditar.mjs`)
- [x] `capa/capa.png`
- [ ] verificação final (checklist v2 + contagem de tópicos × manifesto)
- [ ] **publicar**: repo `inematds/loopgraph` → push → GitHub Pages (raiz, branch main)
      → skill `atualiza-portal` com a URL `https://inematds.github.io/loopgraph/`

## Conteúdo já decidido das trilhas 2–5 (para não re-derivar)

**T2 · 2-1 Anatomia do loop** — 1 os cinco passos (descobrir/planejar/agir/verificar/parar) ·
2 condição de parada (sucesso vs desistência, em camadas) · 3 o que atravessa as voltas
(contexto/memória; embrião do state schema) · 4 o Ralph loop (versão simples ≠ errada, incompleta)
· 5 aberto × fechado (realimentação) · 6 loop dentro de loop (a ponte pro grafo).

**T2 · 2-2 O verificador é o gargalo** — 1 o verificador é o teto de qualidade · 2 escada de
verificadores (compila→lint→teste→LLM-judge→humano; determinístico > probabilístico) ·
3 carimbo no próprio trabalho (revisar no mesmo contexto = aprovar sempre; exige contexto limpo)
· 4 contra o que você compara (referência concreta) · 5 o verificador que apodrece ·
6 escreva o verificador primeiro (e teste-o contra um caso ruim conhecido).

**T2 · 2-3 Onde o loop quebra** — 4 falhas estruturais (Perez) + 2 bônus: 1 burla a própria
métrica (Goodhart) · 2 cegueira pra cima (termostato não duvida do alvo) · 3 loops colidindo
(cada um certo, o conjunto errado — SVG malha×solo) · 4 a medição decai (painel verde) ·
5 contexto vira sopa · 6 o loop é sequencial por forma (o único limite que prompt não resolve).

**T3 · 3-1 As cinco camadas** — prompt → contexto → harness → loop → grafo (SVG escada);
cada camada embrulha a de baixo; harness de loop cabe num script, harness de grafo é runtime
distribuído (roteamento entre nós, isolamento de falha, consistência de estado, spawn dinâmico,
observabilidade).

**T3 · 3-2 O comparativo de verdade** — coluna AGENTIC (1 agente + ferramentas + julgamento),
LOOP (ciclo desenhado + teste de saída), GRAPH (loops compostos + arestas explícitas).
O mesmo caso — **daily brief** — construído nos 3 formatos; o que o grafo dá de genuinamente
novo (nós paralelos com contexto limpo, fan-out/fan-in, fluxo legível como diagrama) e o que
ele cobra (mais prompts, state schema, novos modos de falha). Grafo degenerado de 1 nó = loop.
Usar `graph-engineering-panorama.png`.

**T3 · 3-3 Mito × fato** — tabela: GraphRAG ≠ graph engineering · DSPy otimiza programas de LM,
não grafos de conhecimento · Anthropic usa orquestração em código mas não anunciou disciplina
alguma · os números "18% mais acurácia / 85% menos custo" vieram de um estudo específico de
diagramas industriais, não de benchmark geral. Prior art: state machine / XState / LangGraph /
AutoGen / ADK antecedem o termo. "A maioria dos agentes ainda não precisa de grafo."

**T4 · 4-1 Nós, arestas e estado** — nó = unidade de trabalho (agente, chamada de modelo, código
comum ou decisão humana); aresta = o que acontece depois; estado = o que viaja. Config por nó
(modelo, ferramentas, acesso, instruções). Usar `ex4-sistema-agentes.png`.

**T4 · 4-2 Org graph × work graph** — org graph (estável: agentes de vida longa, zone defense,
memória acumulada) × work graph (efêmero: a tarefa de hoje). Fan-out/fan-in. Roteamento por
condição — usar `ex5-suporte-cliente.png` (classificação → FAQ/IA/humano, escalonamento, feedback).

**T4 · 4-3 Falhas, harness e observabilidade** — merge que engole uma fonte, roteamento que
não converge, estado que vaza de um nó pro outro; state schema explícito; execução durável e
retomada; monitor mock de observabilidade (quem rodou, em que ordem, com que latência/custo).

**T5 · 5-1 Do loop ao grafo** — migração passo a passo do daily brief; os sinais que autorizam
migrar; o que medir antes e depois.

**T5 · 5-2 Grafos de negócio e de tarefas** — modelar o funil multi-métrica (`ex2`) e o backlog
com depende/bloqueia (`ex3`); alocação em paralelo.

**T5 · 5-3 Biblioteca de prompts** — prompts copy-run: desenhar o grafo a partir de um processo ·
virar script executável (o "two-step": desenhe o grafo → gere o código) · auditar um grafo
(ciclo sem saída, aresta sem condição, nó sem teto de custo) · achar colisão entre loops ·
escrever o state schema entre dois nós · escrever o verificador antes do prompt.

## Regra de verificação final
`topics` no manifesto **tem que bater** com a contagem de `[data-inema-topic]` no DOM de cada
módulo (6 em todos). Rodar o script de auditoria (contagem + links quebrados + INEMA.CLUB/PRO
+ anti-FOUC antes do Tailwind + ≥1 SVG `role="img"` por módulo).
