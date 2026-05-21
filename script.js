// --- ESTADO INICIAL DO JOGO ---
const gameState = {
    player: { hp: 100, maxHp: 100, energy: 50, maxEnergy: 50, shield: 0 },
    enemy: { hp: 100, maxHp: 100, energy: 50, maxEnergy: 50, shield: 0 },
    currentTurn: 'player', // 'player' ou 'enemy'
    isGameOver: false
};

// --- ARQUIVO DE ELEMENTOS DO DOM ---
const DOM = {
    playerCard: document.getElementById('player-card'),
    enemyCard: document.getElementById('enemy-card'),
    playerHpText: document.getElementById('player-hp-text'),
    playerHpBar: document.getElementById('player-hp-bar'),
    playerEnergyText: document.getElementById('player-energy-text'),
    playerEnergyBar: document.getElementById('player-energy-bar'),
    playerShield: document.getElementById('player-shield'),
    
    enemyHpText: document.getElementById('enemy-hp-text'),
    enemyHpBar: document.getElementById('enemy-hp-bar'),
    enemyEnergyText: document.getElementById('enemy-energy-text'),
    enemyEnergyBar: document.getElementById('enemy-energy-bar'),
    enemyShield: document.getElementById('enemy-shield'),
    
    turnIndicator: document.getElementById('turn-indicator'),
    logBox: document.getElementById('log-box'),
    buttons: document.querySelectorAll('.btn')
};

// --- FUNÇÃO PRINCIPAL DE AÇÃO DO JOGADOR ---
function handleAction(actionType) {
    if (gameState.currentTurn !== 'player' || gameState.isGameOver) return;

    let success = false;

    if (actionType === 'attack') {
        success = executeAttack('player', 'enemy');
    } else if (actionType === 'defend') {
        success = executeDefend('player');
    } else if (actionType === 'heal') {
        success = executeHeal('player');
    }

    if (success) {
        updateUI();
        if (checkGameOver()) return;

        // Passa o turno para o Vilão
        gameState.currentTurn = 'enemy';
        setButtonsState(false); // Desabilita botões durante o turno da IA
        DOM.turnIndicator.innerText = "TURNO DO VILÃO...";
        DOM.turnIndicator.style.color = "var(--neon-red)";

        // Simula o tempo de "pensamento" da IA do Vilão (1.2 segundos)
        setTimeout(executeEnemyTurn, 1200);
    }
}

// --- LOGICA DAS AÇÕES ---

function executeAttack(attacker, defender) {
    // Cálculo de dano básico aleatório (ex: entre 12 e 22)
    let damage = Math.floor(Math.random() * 11) + 12;
    addLog(attacker, `${attacker === 'player' ? 'Você' : 'O Vilão'} atacou!`);

    // Lógica do Escudo mitigando o dano
    if (gameState[defender].shield > 0) {
        if (gameState[defender].shield >= damage) {
            gameState[defender].shield -= damage;
            addLog('system', `O escudo absorveu todo o impacto!`);
            damage = 0;
        } else {
            damage -= gameState[defender].shield;
            addLog('system', `O escudo absorveu ${gameState[defender].shield} de dano!`);
            gameState[defender].shield = 0;
        }
    }

    if (damage > 0) {
        gameState[defender].hp = Math.max(0, gameState[defender].hp - damage);
        addLog(attacker, `Causou ${damage} de dano!`);
        triggerHitAnimation(defender);
    }

    // Ataque básico recupera um pouquinho de energia (10 pontos)
    gameState[attacker].energy = Math.min(gameState[attacker].maxEnergy, gameState[attacker].energy + 10);
    return true;
}

function executeDefend(character) {
    // Gera escudo aleatório e recupera um pouco mais de energia
    const shieldGained = Math.floor(Math.random() * 10) + 15; // 15-25
    gameState[character].shield += shieldGained;
    gameState[character].energy = Math.min(gameState[character].maxEnergy, gameState[character].energy + 15);
    
    addLog(character, `${character === 'player' ? 'Você se defendeu' : 'O Vilão se defendeu'} e gerou ${shieldGained} de escudo!`);
    return true;
}

function executeHeal(character) {
    // Custo de energia para curar
    const energyCost = 20;

    if (gameState[character].energy < energyCost) {
        if (character === 'player') {
            addLog('system', "Energia insuficiente para se recuperar!");
        }
        return false;
    }

    gameState[character].energy -= energyCost;
    const healAmount = Math.floor(Math.random() * 11) + 20; // 20-30 de cura
    gameState[character].hp = Math.min(gameState[character].maxHp, gameState[character].hp + healAmount);
    
    addLog(character, `${character === 'player' ? 'Você' : 'O Vilão'} usou nanotecnologia e recuperou ${healAmount} de HP!`);
    return true;
}

// --- INTELIGÊNCIA ARTIFICIAL DO VILÃO ---
function executeEnemyTurn() {
    if (gameState.isGameOver) return;

    const rand = Math.random();
    const hpPercent = gameState.enemy.hp / gameState.enemy.maxHp;

    // Se a vida do vilão estiver criticamente baixa (< 35%) e ele tiver energia, prioriza cura
    if (hpPercent < 0.35 && gameState.enemy.energy >= 20 && rand < 0.7) {
        executeHeal('enemy');
    } 
    // Caso contrário, escolhe baseado em probabilidades padrões
    else {
        if (rand < 0.55) {
            executeAttack('enemy', 'player'); // 55% de chance de atacar
        } else if (rand < 0.85) {
            executeDefend('enemy');           // 30% de chance de defender
        } else {
            // Tenta curar, se não tiver energia, ataca
            if (!executeHeal('enemy')) {
                executeAttack('enemy', 'player');
            }
        }
    }

    updateUI();
    if (checkGameOver()) return;

    // Retorna o turno para o jogador
    gameState.currentTurn = 'player';
    setButtonsState(true);
    DOM.turnIndicator.innerText = "SEU TURNO";
    DOM.turnIndicator.style.color = "var(--neon-green)";
}

// --- GERENCIAMENTO DE INTERFACE E RENDERIZAÇÃO ---

function updateUI() {
    // Atualiza dados do Jogador
    DOM.playerHpText.innerText = `${gameState.player.hp}/${gameState.player.maxHp}`;
    DOM.playerHpBar.style.width = `${(gameState.player.hp / gameState.player.maxHp) * 100}%`;
    DOM.playerEnergyText.innerText = `${gameState.player.energy}/${gameState.player.maxEnergy}`;
    DOM.playerEnergyBar.style.width = `${(gameState.player.energy / gameState.player.maxEnergy) * 100}%`;
    DOM.playerShield.innerText = gameState.player.shield;

    // Atualiza dados do Vilão
    DOM.enemyHpText.innerText = `${gameState.enemy.hp}/${gameState.enemy.maxHp}`;
    DOM.enemyHpBar.style.width = `${(gameState.enemy.hp / gameState.enemy.maxHp) * 100}%`;
    DOM.enemyEnergyText.innerText = `${gameState.enemy.energy}/${gameState.enemy.maxEnergy}`;
    DOM.enemyEnergyBar.style.width = `${(gameState.enemy.energy / gameState.enemy.maxEnergy) * 100}%`;
    DOM.enemyShield.innerText = gameState.enemy.shield;
}

function triggerHitAnimation(target) {
    const card = target === 'player' ? DOM.playerCard : DOM.enemyCard;
    card.classList.add('hit-shake');
    
    setTimeout(() => {
        card.classList.remove('hit-shake');
    }, 250);
}

function addLog(type, text) {
    const p = document.createElement('p');
    p.classList.add(`${type}-msg`);
    p.innerText = text;
    DOM.logBox.appendChild(p);
    
    // Auto-scroll para manter a última mensagem sempre visível
    DOM.logBox.scrollTop = DOM.logBox.scrollHeight;
}

function setButtonsState(enabled) {
    DOM.buttons.forEach(btn => btn.disabled = !enabled);
}

// --- VERIFICAÇÃO DE FIM DE JOGO ---
function checkGameOver() {
    if (gameState.player.hp <= 0) {
        endGame("K.O.! O VILÃO VENCEU A BATALHA!", "var(--neon-red)");
        return true;
    }
    if (gameState.enemy.hp <= 0) {
        endGame("VITÓRIA! VOCÊ DERROTOU O VILÃO!", "var(--neon-green)");
        return true;
    }
    return false;
}

function endGame(message, color) {
    gameState.isGameOver = true;
    setButtonsState(false);
    DOM.turnIndicator.innerText = message;
    DOM.turnIndicator.style.color = color;
    addLog('system', "Fim de jogo! Atualize a página para recomeçar.");
}