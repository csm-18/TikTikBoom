import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

function createGame(element) {
  const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: element,
    backgroundColor: '#070b19',
    dom: {
      createContainer: true,
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 1000 },
        debug: false,
      },
    },
    scene: [BootScene, GameScene],
  };

  return new Phaser.Game(config);
}

class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    if (!this.textures.exists('plat_tile')) {
      const g = this.add.graphics();
      g.fillStyle(0x1a2647, 1);
      g.fillRect(0, 0, 32, 32);
      g.lineStyle(2, 0x3b528c, 1);
      g.strokeRect(1, 1, 30, 30);
      g.generateTexture('plat_tile', 32, 32);
      g.destroy();
    }

    if (!this.textures.exists('player_bot')) {
      const g = this.add.graphics();
      g.fillStyle(0x00d2ff, 1);
      g.fillRect(4, 0, 24, 20); 
      g.fillStyle(0x0066ff, 1);
      g.fillRect(0, 20, 32, 28); 
      g.fillStyle(0xffffff, 1);
      g.fillRect(6, 6, 6, 4); 
      g.fillRect(20, 6, 6, 4); 
      g.generateTexture('player_bot', 32, 48);
      g.destroy();
    }

    if (!this.textures.exists('glitch_enemy')) {
      const g = this.add.graphics();
      g.fillStyle(0xff3366, 1);
      g.fillRect(2, 2, 28, 28);
      g.fillStyle(0xffffff, 1);
      g.fillRect(6, 8, 4, 4);
      g.fillRect(20, 8, 4, 4);
      g.generateTexture('glitch_enemy', 32, 32);
      g.destroy();
    }

    if (!this.textures.exists('turing_bombe')) {
      const g = this.add.graphics();
      g.fillStyle(0x432b5b, 1);
      g.fillRect(0, 0, 48, 54);
      g.fillStyle(0xffd700, 1);
      g.fillCircle(14, 16, 8);
      g.fillCircle(34, 16, 8);
      g.fillCircle(14, 38, 8);
      g.fillCircle(34, 38, 8);
      g.generateTexture('turing_bombe', 48, 54);
      g.destroy();
    }
  }

  create() {
    for(let i=0; i<960; i+=40) {
      this.add.line(0, 0, i, 0, i, 540, 0x111c3a, 0.4).setOrigin(0);
    }

    this.add.text(480, 180, "TURING'S ENIGMA", {
      fontFamily: 'monospace',
      fontSize: '46px',
      fontWeight: 'bold',
      color: '#00d2ff',
    }).setOrigin(0.5);

    this.add.text(480, 230, 'The Solstice Protocol • DEV Game Jam Edition', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#8fa0cd',
    }).setOrigin(0.5);

    this.add.text(480, 340, '[ Press ENTER to Initialize Core Tape ]', {
      fontFamily: 'monospace',
      fontSize: '20px',
      color: '#fff',
    }).setOrigin(0.5);

    const enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enter.on('down', () => this.scene.start('GameScene'));
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.currentLevelIndex = 0;
    this.currentStage = 'training';
    this.tapeState = '0';
    this.score = 0;
    this.showingPuzzle = false;
    this.gameOver = false;
    this.transitioning = false;
  }

  create() {
    this.levels = [
      {
        name: 'Hut 8 Array Gates',
        concept: 'Arrays & Index Memory Access',
        enemies: 2,
        speed: 80,
        layout: [
          { x: 480, y: 510, sx: 30, sy: 2 },
          { x: 200, y: 420, sx: 6, sy: 0.6 },
          { x: 760, y: 420, sx: 6, sy: 0.6 },
          { x: 480, y: 310, sx: 7, sy: 0.6 }
        ],
        bombePos: { x: 480, y: 250 },
        training: {
          clue: 'Given Data Array: [12, 24, 48, 96, 192]\nWhat value is stored at index 3?',
          hint: 'Arrays use 0-based indexing. Index 0 holds 12, Index 1 holds 24...',
          answer: ['96']
        },
        mission: {
          clue: 'If an array allocation spans indices 0 through 7,\nwhat is the total Length capacity of this array?',
          hint: 'Count total slots from zero inclusive up to seven.',
          answer: ['8']
        }
      },
      {
        name: 'The Linear Decoder',
        concept: 'Search Algorithm Efficiencies',
        enemies: 3,
        speed: 100,
        layout: [
          { x: 480, y: 510, sx: 30, sy: 2 },
          { x: 480, y: 410, sx: 12, sy: 0.6 },
          { x: 180, y: 310, sx: 5, sy: 0.6 },
          { x: 780, y: 310, sx: 5, sy: 0.6 }
        ],
        bombePos: { x: 180, y: 250 },
        training: {
          clue: 'Searching linearly through a scrambled list of 100 items,\nwhat is the worst-case number of comparison operations?',
          hint: 'In worst-case scenario, the item is at the final position or missing.',
          answer: ['100']
        },
        mission: {
          clue: 'In a completely sorted array of 31 items, what is the maximum\nchecks required using Binary Search?',
          hint: 'Binary search cuts work in half each time: log2(32) yields...',
          answer: ['5']
        }
      },
      {
        name: 'Bletchley Sort Core',
        concept: 'Algorithm Sorting Complexity',
        enemies: 4,
        speed: 110,
        layout: [
          { x: 480, y: 510, sx: 30, sy: 2 },
          { x: 300, y: 420, sx: 5, sy: 0.6 },
          { x: 600, y: 330, sx: 5, sy: 0.6 },
          { x: 300, y: 240, sx: 5, sy: 0.6 }
        ],
        bombePos: { x: 300, y: 180 },
        training: {
          clue: 'Which sorting algorithm has a guaranteed performance profile of\nO(n log n) even in its absolute worst-case scenario?',
          hint: 'Choose between: bubblesort, quicksort, mergesort.',
          answer: ['mergesort', 'merge sort']
        },
        mission: {
          clue: 'What is the structural average-case time complexity\nof standard Bubble Sort loops?',
          hint: 'Nested loops traversing inputs quadratically result in O(...) notation.',
          answer: ['o(n^2)', 'on^2', 'n^2']
        }
      },
      {
        name: 'The Linked Chain',
        concept: 'Linear Linked Lists & Pointer Nodes',
        enemies: 3,
        speed: 120,
        layout: [
          { x: 480, y: 510, sx: 30, sy: 2 },
          { x: 480, y: 420, sx: 24, sy: 0.6 },
          { x: 480, y: 320, sx: 14, sy: 0.6 },
          { x: 480, y: 220, sx: 6, sy: 0.6 }
        ],
        bombePos: { x: 480, y: 160 },
        training: {
          clue: 'Unlike array structures, elements in a single Linked List do not require\ncontiguous blocks of memory. What connects one node to the next?',
          hint: 'A reference variable holding a memory location addresses.',
          answer: ['pointer', 'pointers', 'reference', 'link']
        },
        mission: {
          clue: 'What is the time complexity to insert a new head node item\nat the absolute front of a Singly Linked List?',
          hint: 'Changing head references takes a constant fraction of work.',
          answer: ['o(1)', 'o1', '1']
        }
      },
      {
        name: 'Stack Pointer Matrix',
        concept: 'LIFO (Last-In First-Out) Architectures',
        enemies: 4,
        speed: 130,
        layout: [
          { x: 480, y: 510, sx: 30, sy: 2 },
          { x: 150, y: 400, sx: 5, sy: 0.6 },
          { x: 480, y: 400, sx: 5, sy: 0.6 },
          { x: 810, y: 400, sx: 5, sy: 0.6 }
        ],
        bombePos: { x: 810, y: 340 },
        training: {
          clue: 'Stack buffers use a strict architectural tracking methodology.\nWhat is the short technical acronym used for Last-In, First-Out?',
          hint: 'Four letters starting with L.',
          answer: ['lifo']
        },
        mission: {
          clue: 'What is the name of the operations execution function used to\nremove and return the top element from a processing Stack?',
          hint: 'Commonly paired with its opposite partner function "push".',
          answer: ['pop']
        }
      },
      {
        name: 'Queue Stream Protocol',
        concept: 'FIFO (First-In First-Out) Pipelines',
        enemies: 4,
        speed: 140,
        layout: [
          { x: 480, y: 510, sx: 30, sy: 2 },
          { x: 500, y: 420, sx: 16, sy: 0.6 },
          { x: 200, y: 320, sx: 6, sy: 0.6 }
        ],
        bombePos: { x: 200, y: 260 },
        training: {
          clue: 'Queues maintain transactional stream order. What acronym defines\nthe First-In, First-Out structural standard?',
          hint: 'Four letters starting with F.',
          answer: ['fifo']
        },
        mission: {
          clue: 'What is the formal structural term for inserting an item into\nthe back tail of a valid runtime Queue?',
          hint: 'The opposite of removing items via "dequeue".',
          answer: ['enqueue']
        }
      },
      {
        name: 'The Binary Tree',
        concept: 'Non-Linear Hierarchical Networks',
        enemies: 5,
        speed: 150,
        layout: [
          { x: 480, y: 510, sx: 30, sy: 2 },
          { x: 250, y: 420, sx: 6, sy: 0.6 },
          { x: 710, y: 420, sx: 6, sy: 0.6 },
          { x: 480, y: 320, sx: 6, sy: 0.6 }
        ],
        bombePos: { x: 480, y: 260 },
        training: {
          clue: 'What is the name given to the single top-most apex node origin point\nof a valid hierarchical Binary Tree structure?',
          hint: 'Think of the bottom of a plant, inverted in computer science representations.',
          answer: ['root']
        },
        mission: {
          clue: 'If a balanced Binary Search Tree contains 3 operational levels,\nwhat is the maximum total count of leaf nodes on its bottom layer?',
          hint: 'Each node splits exactly into 2 tracks. Level 0=1, Level 1=2, Level 2=...',
          answer: ['4']
        }
      },
      {
        name: 'The Turing Machine',
        concept: 'Universal Computability & The Halting Limit',
        enemies: 6,
        speed: 160,
        layout: [
          { x: 480, y: 510, sx: 30, sy: 2 },
          { x: 480, y: 410, sx: 20, sy: 0.6 },
          { x: 480, y: 300, sx: 10, sy: 0.6 }
        ],
        bombePos: { x: 480, y: 240 },
        training: {
          clue: 'Alan Turing proved that no universal algorithm can perfectly predict if a given program\nwill finish running or run forever. What is this famous problem called?',
          hint: 'Named after the action of stopping execution completely.',
          answer: ['halting problem', 'the halting problem', 'halting']
        },
        mission: {
          clue: 'Excellent! To execute final decryption override, type the status term\nof the test used to see if a machine displays human-intelligent behavior.',
          hint: 'Named directly after the birthday hero himself.',
          answer: ['turing test', 'the turing test']
        }
      }
    ];

    this.bgBlock = this.add.rectangle(480, 270, 960, 540, 0x060a17);
    this.platforms = this.physics.add.staticGroup();

    this.player = this.physics.add.sprite(150, 350, 'player_bot');
    this.player.setCollideWorldBounds(true).setBounce(0.02);

    this.bullets = this.physics.add.group();
    this.enemies = this.physics.add.group();

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.bullets, this.platforms, (b) => b.destroy());
    
    this.physics.add.overlap(this.bullets, this.enemies, this.handleBulletStrikes, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.handlePlayerDamage, null, this);

    this.bombeMachine = this.physics.add.staticSprite(0, 0, 'turing_bombe');
    this.buildLevelMap();

    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      shoot: Phaser.Input.Keyboard.KeyCodes.SPACE,
      toggle: Phaser.Input.Keyboard.KeyCodes.Z,
      action: Phaser.Input.Keyboard.KeyCodes.E
    });

    this.input.keyboard.on('keydown-Z', () => {
      this.tapeState = this.tapeState === '0' ? '1' : '0';
      this.hudTape.setText(`TAPE BUFFER STATE: [ ${this.tapeState} ]`);
      this.hudTape.setTint(this.tapeState === '0' ? 0x00d2ff : 0xffa500);
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.showingPuzzle || this.gameOver || this.transitioning) return;
      const facingDir = this.player.flipX ? -1 : 1;
      const b = this.bullets.create(this.player.x + (facingDir * 22), this.player.y - 4, 'plat_tile');
      b.setScale(0.4, 0.15);
      b.body.allowGravity = false;
      b.body.setVelocityX(550 * facingDir);
      b.setTint(this.tapeState === '0' ? 0x00d2ff : 0xffa500);
    });

    this.input.keyboard.on('keydown-E', () => {
      if (!this.nearTerminal || this.showingPuzzle || this.gameOver || this.transitioning) return;
      this.launchDecryptionInterface();
    });

    this.renderHUD();
    this.buildModalDOM();
  }

  buildLevelMap() {
    this.platforms.clear(true, true);
    const data = this.levels[this.currentLevelIndex];
    const backgroundHexes = [0x060a17, 0x0a0617, 0x061417, 0x141206, 0x06170f, 0x170606, 0x111624, 0x02050d];
    this.bgBlock.setFillStyle(backgroundHexes[this.currentLevelIndex]);

    data.layout.forEach(plat => {
      this.platforms.create(plat.x, plat.y, 'plat_tile').setScale(plat.sx, plat.sy).refreshBody();
    });

    this.bombeMachine.setPosition(data.bombePos.x, data.bombePos.y).refreshBody();
  }

  renderHUD() {
    this.add.rectangle(480, 45, 920, 70, 0x0c132a).setStrokeStyle(1, 0x1d2c56);
    this.hudSector = this.add.text(40, 22, '', { fontFamily: 'monospace', fontSize: '20px', color: '#00d2ff', fontWeight: 'bold' });
    this.hudConcept = this.add.text(40, 50, '', { fontFamily: 'monospace', fontSize: '13px', color: '#8fa0cd' });
    this.hudTape = this.add.text(560, 24, 'TAPE BUFFER STATE: [ 0 ]', { fontFamily: 'monospace', fontSize: '14px', color: '#00d2ff' });
    this.hudStatus = this.add.text(560, 50, 'STATUS: APPROACH THE BOMBE INTERFACE [E]', { fontFamily: 'monospace', fontSize: '13px', color: '#00ffcc' });
    
    // NEW HUD COMPONENT: Large warning alert for clear stage objective feedback
    this.phaseAlert = this.add.text(480, 105, '', { 
      fontFamily: 'monospace', 
      fontSize: '15px', 
      fontWeight: 'bold',
      color: '#ffa500', 
      backgroundColor: '#120b05',
      padding: { x: 10, y: 4 }
    }).setOrigin(0.5).setVisible(false).setDepth(10);

    this.updateHUDSectors();
  }

  updateHUDSectors() {
    const data = this.levels[this.currentLevelIndex];
    const displayStage = this.currentStage.toUpperCase();
    this.hudSector.setText(`SECTOR ${this.currentLevelIndex + 1}/8 : ${data.name} [${displayStage}]`);
    this.hudConcept.setText(`THEORY MATRICES: ${data.concept}`);
  }

  buildModalDOM() {
    this.modalView = this.add.container(230, 130).setVisible(false).setDepth(1000);
    const bg = this.add.rectangle(0, 0, 500, 310, 0x0b1124, 0.98).setOrigin(0);
    const frame = this.add.rectangle(0, 0, 500, 310).setStrokeStyle(2, 0x00d2ff).setOrigin(0);
    
    this.modalTitle = this.add.text(250, 25, 'Bletchley Decryption Subroutine', { fontFamily: 'monospace', fontSize: '20px', color: '#00d2ff' }).setOrigin(0.5);
    this.modalPrompt = this.add.text(30, 75, '', { fontFamily: 'monospace', fontSize: '15px', color: '#fff', wordWrap: { width: 440 } });
    this.modalHint = this.add.text(30, 175, '', { fontFamily: 'monospace', fontSize: '12px', color: '#8fa0cd', wordWrap: { width: 440 } });

    this.domInput = this.add.dom(180, 240, 'input', {
      width: '200px', height: '30px', background: '#121b34', color: '#fff', border: '1px solid #3b528c', padding: '0 6px', fontFamily: 'monospace'
    });
    
    this.domBtn = this.add.dom(360, 240, 'button', {
      width: '100px', height: '30px', background: '#0066ff', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'monospace'
    }, 'DECRYPT');

    this.domBtn.addListener('click');
    this.domBtn.on('click', () => this.evaluateDecryptionAttempt());

    this.domInput.node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.evaluateDecryptionAttempt();
      }
    });

    this.modalView.add([bg, frame, this.modalTitle, this.modalPrompt, this.modalHint, this.domInput, this.domBtn]);
  }

  launchDecryptionInterface() {
    if (this.currentStage === 'mission' && this.enemies.countActive() > 0) {
      this.hudStatus.setText('ERROR: CLEAR SECTOR ALGORITHMIC ANOMALIES FIRST!');
      this.hudStatus.setTint(0xff3366);
      return;
    }

    this.showingPuzzle = true;
    this.domInput.node.value = '';
    const levelData = this.levels[this.currentLevelIndex][this.currentStage];
    
    this.modalPrompt.setText(levelData.clue);
    this.modalHint.setText(`LOGIC HINT: ${levelData.hint}`);
    this.modalView.setVisible(true);
    
    setTimeout(() => this.domInput.node.value = '', 10);
    setTimeout(() => this.domInput.node.focus(), 50);
  }

  evaluateDecryptionAttempt() {
    const levelData = this.levels[this.currentLevelIndex][this.currentStage];
    const processedInput = this.domInput.node.value.trim().toLowerCase();
    const matches = levelData.answer.map(v => v.toLowerCase().trim());

    if (matches.includes(processedInput)) {
      this.resolveStageSuccess();
    } else {
      this.hudStatus.setText('DECRYPTION FAILURE: PARITY CHECK ERROR. RETRY.');
      this.hudStatus.setTint(0xff3366);
      this.domInput.node.value = '';
    }
  }

  resolveStageSuccess() {
    this.showingPuzzle = false;
    this.modalView.setVisible(false);
    this.hudStatus.setTint(0x00ffcc);

    if (this.currentStage === 'training') {
      this.currentStage = 'mission';
      this.hudStatus.setText('DECRYPTION LOCKED. WARNING: RELEASING RUNTIME GLITCHES.');
      this.updateHUDSectors();
      this.triggerGlitchInvasion();

      // UX FIX: Fire pulsing instructions alert to clear out transition ambiguity loop
      this.phaseAlert.setText('⚠️ TRAINING DATA CRACKED! ELIMINATE ENEMIES & RETURN TO THE BOMBE MACHINE TERMINAL!');
      this.phaseAlert.setVisible(true);
      
      // Auto fade alert safely after 4 seconds run time
      if (this.alertFadeTimer) this.alertFadeTimer.remove();
      this.alertFadeTimer = this.time.delayedCall(4000, () => {
        this.phaseAlert.setVisible(false);
      });

    } else {
      if (this.currentLevelIndex >= this.levels.length - 1) {
        this.triggerUniversalVictory();
      } else {
        this.transitioning = true;
        this.enemies.clear(true, true);
        this.phaseAlert.setVisible(false);
        
        this.currentLevelIndex++;
        this.currentStage = 'training';
        this.hudStatus.setText('SECTOR CLEARED. ACCESSING NEXT COMPUTATIONAL FIELD.');
        
        this.buildLevelMap();
        this.updateHUDSectors();
        
        this.player.setPosition(150, 350);
        this.player.body.setVelocity(0,0);
        
        this.time.delayedCall(100, () => {
          this.transitioning = false;
        });
      }
    }
  }

  triggerGlitchInvasion() {
    const levelData = this.levels[this.currentLevelIndex];
    for (let i = 0; i < levelData.enemies; i++) {
      const spawnX = Phaser.Math.Between(400, 900);
      const spawnY = Phaser.Math.Between(150, 300);
      const enemy = this.enemies.create(spawnX, spawnY, 'glitch_enemy');
      enemy.setCollideWorldBounds(true).setBounce(1, 0.05);
      enemy.immuneState = (i % 2 === 0) ? '0' : '1';
      enemy.setTint(enemy.immuneState === '0' ? 0xff4d4d : 0xff9900);
      enemy.body.setVelocityX(Phaser.Math.Between(-levelData.speed, -levelData.speed * 0.6));
    }
  }

  handleBulletStrikes(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
    this.score += 25;
    if (this.enemies.countActive() === 0) {
      this.hudStatus.setText('THREATS PURGED. LOG BACK INTO TERMINAL FOR PROTOCOL ADVANCEMENT.');
      
      // Dynamic notification updates when battle loops switch objectives
      this.phaseAlert.setText('⚡ SECTOR CLEAR: APPROACH TERMINAL NODE AND PRESS [E] TO OVERRIDE LEVEL!');
      this.phaseAlert.setVisible(true);
    }
  }

  handlePlayerDamage(player, enemy) {
    if (this.gameOver || this.transitioning) return;
    
    this.gameOver = true;
    this.physics.pause();
    this.hudStatus.setText('HALTING STATE INITIATED: SYSTEM MEMORY CORRUPTED.');
    
    this.add.text(480, 240, 'CRITICAL SYSTEM FAILURE', { fontFamily: 'monospace', fontSize: '32px', color: '#ff3366' }).setOrigin(0.5);
    
    const reloadBtn = this.add.dom(480, 310, 'button', {
      width: '160px', height: '36px', background: '#ff3366', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'monospace'
    }, 'REBOOT SYSTEM');
    
    reloadBtn.addListener('click');
    reloadBtn.on('click', () => {
      this.gameOver = false;
      this.currentStage = 'training';
      this.scene.restart();
    });
  }

  triggerUniversalVictory() {
    this.gameOver = true;
    this.physics.pause();
    this.bombeMachine.destroy();
    this.enemies.clear(true, true);
    if(this.phaseAlert) this.phaseAlert.setVisible(false);
    this.hudStatus.setText('SOLSTICE PROTOCOL OPERATIONAL. SYSTEM FULLY ENCRYPTED.');
    
    this.add.rectangle(480, 270, 960, 540, 0x070b19, 0.9);
    this.add.text(480, 200, 'COMPUTATION PASS COMPLETE', { fontFamily: 'monospace', fontSize: '38px', color: '#00ffcc' }).setOrigin(0.5);
    this.add.text(480, 260, 'Happy Birthday Alan Turing! The Turing Machine has safely halted.', { fontFamily: 'monospace', fontSize: '16px', color: '#8fa0cd' }).setOrigin(0.5);
  }

  update() {
    if (this.gameOver || this.showingPuzzle || this.transitioning) {
      this.player.setVelocityX(0);
      return;
    }

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-240);
      this.player.flipX = true;
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(240);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.keys.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-520);
    }

    this.bullets.children.entries.forEach(b => {
      if(b && (b.x < 0 || b.x > 960)) b.destroy();
    });

    this.nearTerminal = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.bombeMachine.x, this.bombeMachine.y) < 85;

    if (this.nearTerminal && !this.showingPuzzle) {
      if (!this.actionTip) {
        this.actionTip = this.add.text(480, 160, '[ PRESS E TO CONNECT TERMINAL LINK ]', {
          fontFamily: 'monospace', fontSize: '14px', color: '#00ffcc', backgroundColor: '#070b19'
        }).setOrigin(0.5).setDepth(20);
      }
      this.actionTip.setVisible(true);
    } else if (this.actionTip) {
      this.actionTip.setVisible(false);
    }
  }
}

export default function PhaserGame() {
  const gameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gameRef.current = createGame(containerRef.current);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return (
    <div 
      className="phaser-game-window" 
      ref={containerRef} 
      style={{ width: '960px', height: '540px', position: 'relative', margin: '0 auto', border: '4px solid #1a2647', borderRadius: '8px', overflow: 'hidden' }} 
    />
  );
}