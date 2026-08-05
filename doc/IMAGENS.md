# Imagens do curso

Originais (como vieram) em `doc/imagens-originais/`.
Cópias usadas pelo site, com nome estável, em `assets/img/`.
**Sempre referencie `assets/img/`** — nunca `doc/imagens-originais/`.

| Arquivo em `assets/img/` | O que mostra | Onde é usada |
|---|---|---|
| `graph-engineering-panorama.png` | Infográfico dos 4 estágios (loop simples → harnesses/skills → orquestrador → grafo de agentes), o bloco "Por que grafos?" (paralelismo, dependências, múltiplas métricas, escalabilidade) e a faixa **Loop Engineering vs Graph Engineering** | **Capa** (`capa/capa.png`, mesma imagem) · landing (seção "A tese") · T3 3-2 (comparativo) |
| `ex1-rotina-manha.png` | Exemplo 1 — rotina da manhã como grafo com pesos em minutos, incluindo o caminho alternativo "café pronto/automatizado" (5 min) | T1 1-1 tópico 4 (peso) · T1 1-2 tópico 1 (modelar) |
| `ex2-funil-crescimento.png` | Exemplo 2 — funil de crescimento: campanha → tráfego → landing → signup → ativação → retenção → LTV, com churn, CAC e a razão LTV/CAC > 3; em vermelho, o laço "melhor campanha → menor churn → maior LTV" | T1 1-2 tópico 3 · T2 2-3 (colisão de loops) · T5 5-2 |
| `ex3-projeto-software.png` | Exemplo 3 — épico/histórias/tarefas com legenda de três tipos de aresta: decomposição (branca), **depende** (vermelha) e **bloqueia** (azul) | T1 1-2 tópico 4 · T5 5-2 |
| `ex4-sistema-agentes.png` | Exemplo 4 — orquestração em grafo: usuário → orquestrador, com planejador, pesquisador, executor (+ferramentas), validador com feedback de volta, memória e resultado | T4 4-1 · T4 4-2 |
| `ex5-suporte-cliente.png` | Exemplo 5 — suporte ao cliente: classificação roteando por complexidade para FAQ / agente IA / humano, com arestas de escalonamento (vermelha), "se não resolvido" (tracejada) e feedback/aprendizado (verde) | T4 4-2 (roteamento) · T5 5-1 |

## Regras de uso

- Toda imagem entra em `<figure>` com `class="w-full h-auto rounded-xl border border-dark-600"`.
- `alt` **descreve o diagrama** (o que está desenhado), `figcaption` **ensina** (o que olhar e o que significa).
- As imagens são um **extra** — não substituem o SVG inline obrigatório de cada módulo (erro crítico #17).
  Cada módulo continua tendo ≥1 diagrama SVG futurista inline; as PNGs somam.
- São PNGs raster: no tema claro ficam escuras (fundo preto). Isso é intencional e consistente com o estilo lousa.
