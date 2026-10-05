# 🕸️ Graph Engineering — de loops a grafos

Curso completo, em português, sobre **graph engineering**: de loops isolados a grafos de agentes.
Começa do zero — o que é um nó, o que é uma aresta — e termina com você desenhando, rodando e
depurando um grafo de agentes de verdade. Com o antídoto para o hype no meio do caminho.

**No ar:** https://inematds.github.io/loopgraph/

---

## A tese

> **Um loop já é um grafo — um grafo cujo caminho volta a um nó anterior.**

Você não gradua de loops para grafos. Você **compõe** loops em grafos quando um loop deixa de
bastar — e paga por isso em prompts, em *state schema* e em novos modos de falha.
Acerte o loop primeiro; monte o grafo quando o trabalho exigir.

## As 5 trilhas

| # | Trilha | O que cobre |
|---|--------|-------------|
| 1 | **Fundamentos: o grafo** | Nó, aresta, direção, peso, ciclo, DAG · sua manhã, o grafo social, o funil CAC/churn/LTV, o backlog, a documentação, o build · travessia, caminho mínimo, ordem topológica, paralelismo, detecção de ciclo |
| 2 | **Loop Engineering** | O ciclo descobrir→planejar→agir→verificar→parar · condição de parada em camadas · por que o **verificador é o gargalo** · as 4 falhas estruturais do loop |
| 3 | **Agentic × Loop × Graph** | As cinco camadas (prompt, contexto, harness, loop, grafo) · o mesmo caso construído nas 3 arquiteturas · a tabela **mito × fato** contra o hype |
| 4 | **Graph Engineering na prática** | Nós, arestas e estado · org graph × work graph · zone defense · fan-out/fan-in · state schema · modos de falha novos · observabilidade |
| 5 | **Mão na massa** | Migrar um caso real de loop para grafo (com critério pra **não** migrar) · modelar o grafo do negócio e do backlog · biblioteca de 6 prompts copy-run |

**5 trilhas · 15 módulos · 90 tópicos · ~10h**

## Como usar

Abre direto no navegador — não precisa de build, servidor nem instalação:

```bash
git clone git@github.com:inematds/loopgraph.git
cd loopgraph
xdg-open index.html      # ou simplesmente abra o arquivo
```

Cada página é self-contained (HTML + Tailwind via CDN + JS inline) e funciona em `file://`.

### Camada de aprendizagem

Progresso, dúvidas e anotações ficam **no seu próprio navegador** (`localStorage`) — nada sobe pra
servidor nenhum:

- **Marcar como lido** por seção — é o que faz o progresso andar (curso, trilha e módulo)
- **Tenho dúvida** por tópico, e **grifo/anotação** selecionando qualquer trecho do texto
- **Minha jornada** — painel que agrega progresso, dúvidas e notas, com "continuar de onde parei"
- **Export/import** do seu estado em `.json`
- Temas de leitura (claro, sépia, foco, alto contraste) + tamanho, entrelinha e largura de linha

Se o JavaScript falhar ou o `localStorage` estiver bloqueado, o curso continua 100% legível.

## Estrutura do repositório

```
.
├── index.html                 # landing
├── capa/capa.png              # capa oficial
├── assets/
│   ├── learn.css / learn.js   # camada de aprendizagem (INEMA formato-curso-v2)
│   ├── curso.css              # base + light mode das 5 trilhas
│   └── img/                   # diagramas usados nos módulos
├── curso/trilha1..5/
│   ├── index.html             # índice da trilha
│   └── modulo-N-M.html        # módulos
└── doc/
    ├── PLANO.md               # estrutura, decisões e conteúdo de cada módulo
    ├── IMAGENS.md             # o que cada imagem mostra e onde é usada
    ├── auditar.mjs            # auditoria automática do curso
    └── _template.html         # head/nav/footer canônicos
```

### Auditoria

```bash
node doc/auditar.mjs
```

Valida por página: anti-FOUC antes do Tailwind, manifesto do curso idêntico em todas as páginas,
`topics` do manifesto batendo com os `data-inema-topic` reais do DOM, nav completo, INEMA.CLUB +
PRO, "Mapa da trilha", "Ver Completo" em cada card, mínimo de 6 tópicos por módulo, as 3 seções
por tópico, SVG com `aria-label`, `alt` em toda imagem, code box com "Como verificar", e links e
imagens quebrados. Sai com código 1 se achar problema.

## Fontes

Ponto de partida: o vídeo [*Larguei tudo pra aprender Graph Engineering*](https://www.youtube.com/watch?v=IYV_rqQpwcA).
Aprofundado com a discussão pública de julho de 2026 sobre o tema — incluindo as posições céticas —
e a documentação de LangGraph, Microsoft AutoGen e Google ADK. Detalhes em `doc/PLANO.md`.

---

Feito com o formato **INEMA formato-curso-v2**.
[INEMA.CLUB](https://inema.club) · [PRO](https://inema.pro)

<!-- inema-backlink:v1 -->
## Mais no INEMA.CLUB

- [Ficha completa deste curso](https://www.inema.club/cursos/232-graph-engineering-de-loops-a-grafos/)
- [Guia: como aprender inteligência artificial](https://www.inema.club/aprender-inteligencia-artificial/)
- [Todos os cursos](https://www.inema.club/cursos/)
<!-- /inema-backlink:v1 -->
