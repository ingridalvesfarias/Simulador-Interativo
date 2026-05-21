# ⚡ SHADOW // COMBAT

> Status do Projeto: 🚀 Concluído & Pronto para o Combate

Um mini-game de combate estratégico baseado em turnos com estética sombria inspirada em quadrinhos (*Dark Comic Book style*). O projeto foi desenvolvido com foco em manipulação intensa de DOM, gerenciamento de estado limpo no JavaScript e feedback visual dinâmico com CSS puro.

---

## 🎮 Como Jogar

O jogo funciona em um sistema clássico de turnos (estilo RPG de mesa ou cartas): **Você joga, e em seguida a Inteligência Artificial do Vilão responde.** O objetivo é zerar os 100 pontos de vida (HP) do Vilão antes que ele zere os seus.

### 📊 Entendendo as Barras de Status:
*   🟢 **HP (Barra Verde):** Seus pontos de vida atuais. Não deixe chegar a 0!
*   🟣 **Energia (Barra Roxa):** O combustível necessário para usar tecnologias de cura.
*   🔵 **Escudo (Indicador Numérico):** Absorve o dano do próximo ataque inimigo, protegendo seu HP.

### ⚔️ Suas Opções de Ação:
No seu turno, escolha estrategicamente uma das três ações no painel inferior:
1.  **ATACAR:** Causa dano aleatório à vida do Vilão (mitigado se ele tiver escudo) e **recupera +10 de Energia** para você.
2.  **DEFENDER:** Cria uma barreira de escudo temporária para absorver o próximo golpe e **recupera +15 de Energia**.
3.  **RECUPERAR:** Consome **20 de Energia** para curar uma quantidade significativa do seu HP. *(Dica: Se a sua barra roxa estiver vazia, ataque ou defenda para recarregá-la!)*

---

## 🛠️ Como o Jogo Foi Construído (Bastidores Técnicos)

Este projeto demonstra a aplicação prática de lógica de programação pura e controle de interface sem o uso de frameworks externos.

### 🧬 Principais Aprendizados e Arquitetura:

*   **Gerenciamento de Estado Centralizado (State Pattern Simplificado):** Todo o ecossistema do jogo (HP, energia, escudos e controle de quem é a vez) é controlado por um único objeto literal JavaScript (`gameState`). Isso garante consistência total, impedindo bugs de dessincronização entre o que a IA calcula e o que aparece na tela.
*   **Manipulação Avançada do DOM:** Atualizações em tempo real de textos, alteração dinâmica da largura das barras de status (`style.width`) com transições fluidas e inserção automatizada de logs de combate com rolagem automática inteligente (`scrollTop`).
*   **Inteligência Artificial Baseada em Probabilidade:** A IA do Vilão toma decisões dinâmicas usando o método `Math.random()`. Se a vida do Vilão estiver criticamente baixa (< 35%) e ele tiver energia suficiente, o algoritmo aumenta drasticamente a probabilidade dele escolher se curar em vez de atacar.
*   **Animações e Micro-interações com CSS Nativo:** Efeitos de impacto visual na interface — como o tremor da tela (*shake animation*) e bordas vermelhas temporárias ao sofrer dano — são acionados adicionando e removendo classes CSS via JavaScript (`classList.add` / `setTimeout`).

---

## 🎨 Design & Identidade Visual

O layout foi planejado para capturar a atenção do usuário nos primeiros 3 segundos:
*   **Estética Dark Mode:** Fundo escuro profundo com textura em padrão de pontos (*dotted layout*), remetendo às impressões de gibis antigos.
*   **Contraste Neon:** Uso de roxo e verde neon para criar pontos de foco imediatos para o usuário nas barras e botões.
*   **Estilo Comic Book:** Bordas pretas grossas e marcantes, cards centralizados e tipografia de impacto (`Bangers` e `Rajdhani`) importadas do Google Fonts.

---

## 🚀 Tecnologias Utilizadas

*   **HTML5** (Estruturação semântica e containers de batalha)
*   **CSS3** (Variáveis nativas, flexbox, keyframes de animação e responsividade para dispositivos móveis)
*   **JavaScript (ES6+)** (Lógica de turnos, manipulação de DOM, IA e controle de estado)

---

## 🚀 Acesse o Projeto
Acesse: https://simulador-interativo.vercel.app/

<img src="img/imagem do projeto.png" alt="imagem do projeto">
