import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

function createGame(element) {
  const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: element,
    backgroundColor: '#0a1229',
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
        gravity: { y: 700 },
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
    // Ground sprite - platform tiles
    this.load.image('ground', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCA2NCAyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iMjIiIGZpbGw9IiMxODM1NmYiLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjQiIGhlaWdodD0iMTEiIGZpbGw9IiMyNDNiNmEiLz48cmVjdCB4PSIwIiB5PSI2IiB3aWR0aD0iOCIgaGVpZ2h0PSIyIiBmaWxsPSIjMDgwODNkIi8+PHJlY3QgeD0iMTYiIHk9IjYiIHdpZHRoPSI4IiBoZWlnaHQ9IjIiIGZpbGw9IiMwODA4M2QiLz48cmVjdCB4PSIzMiIgeT0iNiIgd2lkdGg9IjgiIGhlaWdodD0iMiIgZmlsbD0iIzA4MDgzZCIvPjxyZWN0IHg9IjQ4IiB5PSI2IiB3aWR0aD0iOCIgaGVpZ2h0PSIyIiBmaWxsPSIjMDgwODNkIi8+PC9zdmc+');
    // Player sprite - blue/cyan character with head and limbs
    this.load.image('player', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI4IiB5PSI0IiB3aWR0aD0iMTYiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9IiM0YjdmZmYiLz48cmVjdCB4PSI2IiB5PSIxMiIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiBmaWxsPSIjNDI2OWZmIi8+PHJlY3QgeD0iMiIgeT0iMjgiIHdpZHRoPSI4IiBoZWlnaHQ9IjEyIiBmaWxsPSIjNjk5MmVmIi8+PHJlY3QgeD0iMjIiIHk9IjI4IiB3aWR0aD0iOCIgaGVpZ2h0PSIxMiIgZmlsbD0iIzY5OTJlZiIvPjxyZWN0IHg9IjgiIHk9IjQwIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNDI2OWZmIi8+PHJlY3QgeD0iMTYiIHk9IjQwIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNDI2OWZmIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSI4IiByPSIyIiBmaWxsPSIjZWZlZmVmIi8+PGNpcmNsZSBjeD0iMTkiIGN5PSI4IiByPSIyIiBmaWxsPSIjZWZlZmVmIi8+PC9zdmc+');
    // Bomb sprite - dark red with yellow/gold fuse
    this.load.image('bomb', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjI4IiByPSIxNiIgZmlsbD0iIzYwMjAyMCIvPjxyZWN0IHg9IjE4IiB5PSIyIiB3aWR0aD0iMTIiIGhlaWdodD0iNiIgZmlsbD0iI2ZmZTExYiIgcng9IjEiLz48cmVjdCB4PSIyMCIgeT0iOCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iI2ZmZTExYiIgcng9IjEiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjI4IiByPSI0IiBmaWxsPSIjMzMzMzMzIi8+PC9zdmc+');
    // Guide sprite - person with blue/purple color
    this.load.image('guide', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA0OCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjEwIiByPSI2IiBmaWxsPSIjNjk5MmVmIi8+PHJlY3QgeD0iMTQiIHk9IjE4IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiM2OTkyZWYiLz48cmVjdCB4PSI4IiB5PSIzOCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjNDI2OWZmIi8+PHJlY3QgeD0iMzAiIHk9IjM4IiB3aWR0aD0iMTAiIGhlaWdodD0iMjQiIGZpbGw9IiM0MjY5ZmYiLz48L3N2Zz4=');
  }

  create() {
    const centerText = this.add.text(480, 160, 'TiTIkBoom', {
      fontFamily: 'monospace',
      fontSize: '44px',
      color: '#d6e9ff',
      align: 'center',
    }).setOrigin(0.5);

    this.add.text(480, 240, 'Press ENTER to start training', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enterKey.on('down', () => {
      this.scene.start('GameScene');
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.bulletType = '0';
    this.nearBomb = false;
    this.showingPuzzle = false;
    this.currentStage = 'training';
  }

  create() {
    // Define levels first so they're available throughout create()
    this.levels = [
      {
        name: 'Arrays & Lists Basics',
        enemies: 2,
        training: {
          clue: 'Training: Understanding Arrays\nGiven array: [10, 20, 30, 40]\nWhat value is at index 2?',
          hint: 'Arrays are 0-indexed. Index 0 has 10, index 1 has 20, so index 2 has...',
          answer: ['30'],
        },
        mission: {
          clue: 'Mission: Array Traversal\nHow many elements are in [5, 15, 25, 35, 45]?',
          hint: 'Count all elements in the array.',
          answer: ['5'],
        },
      },
      {
        name: 'Search Algorithms',
        enemies: 3,
        training: {
          clue: 'Training: Linear Search\nIn array [2, 7, 1, 9, 3], what is the index of 9?',
          hint: 'Search from left to right: 0→2, 1→7, 2→1, 3→9. Found at index 3.',
          answer: ['3'],
        },
        mission: {
          clue: 'Mission: Search Challenge\nSorted array: [1, 3, 5, 7, 9, 11, 13]\nUsing binary search, how many checks to find 7?',
          hint: 'First check middle (7). Found in 1 check with binary search!',
          answer: ['1'],
        },
      },
      {
        name: 'Sorting & Complexity',
        enemies: 4,
        training: {
          clue: 'Training: Time Complexity\nBubble sort has O(n²) complexity.\nFor n=5 items, max comparisons?',
          hint: 'O(n²) means roughly n×n. For 5 items: 5×5 = 25.',
          answer: ['25', '20', '24'],
        },
        mission: {
          clue: 'Mission: Optimal Sorting\nWhich algorithm is O(n log n) for average case?',
          hint: 'Quick, merge, and heap sort are all O(n log n).',
          answer: ['quicksort', 'mergesort', 'heapsort', 'quick sort', 'merge sort', 'heap sort'],
        },
      },
    ];

    this.add.rectangle(480, 270, 960, 540, 0x08142f);
    this.add.tileSprite(480, 529, 960, 22, 'ground').setScale(2).setOrigin(0, 1);
    this.guideSprite = this.add.image(120, 100, 'guide').setScale(3);

    this.player = this.physics.add.sprite(120, 380, 'player');
    this.player.setDisplaySize(32, 48).setBounce(0.1).setCollideWorldBounds(true);

    const platforms = this.physics.add.staticGroup();
    platforms.create(480, 530, 'ground').setScale(7, 1).refreshBody();

    this.physics.add.collider(this.player, platforms);

    this.cursors = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      up2: Phaser.Input.Keyboard.KeyCodes.UP,
      shoot: Phaser.Input.Keyboard.KeyCodes.SPACE,
      toggle: Phaser.Input.Keyboard.KeyCodes.Z,
      inspect: Phaser.Input.Keyboard.KeyCodes.E,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });

    this.bullets = this.physics.add.group();
    this.enemies = this.physics.add.group();

    this.bomb = this.physics.add.staticSprite(520, 460, 'bomb');
    this.bomb.setDisplaySize(48, 48);
    this.bomb.enemyCount = 0;
    this.bomb.enemiesDefeated = 0;

    this.currentLevelIndex = 0;
    this.levelText = this.add.text(20, 20, `Level 1 • ${this.levels[0].name}`, {
      fontFamily: 'monospace',
      fontSize: '20px',
      color: '#f7f7ff',
    });

    this.guideText = this.add.text(20, 52, 'Move to the bomb and press E. Learn DSA concepts by solving puzzles!', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#bcd4ff',
      wordWrap: { width: 420 },
    });

    this.bulletText = this.add.text(740, 20, 'Bullet: 0', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ffffff',
    });

    this.enemyCountText = this.add.text(740, 40, 'Enemies: 0', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ff9999',
    });

    this.input.keyboard.on('keydown-Z', () => {
      this.bulletType = this.bulletType === '0' ? '1' : '0';
      this.bulletText.setText(`Bullet: ${this.bulletType}`);
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.showingPuzzle) return;
      const bullet = this.bullets.create(this.player.x + 22, this.player.y + 8, null).setSize(12, 12);
      bullet.body.allowGravity = false;
      bullet.setVelocityX(420);
      bullet.setTint(this.bulletType === '0' ? 0x69d3ff : 0xffd56f);
      bullet.type = this.bulletType;
      bullet.update = function () {
        if (this.x > 980) {
          this.destroy();
        }
      };
    });

    this.input.keyboard.on('keydown-E', () => {
      if (!this.nearBomb || this.showingPuzzle) return;
      this.openPuzzle();
    });

    this.puzzleContainer = this.add.container(180, 120).setVisible(false);
    const puzzleBg = this.add.rectangle(0, 0, 600, 300, 0x101c3d, 0.96).setOrigin(0);
    const puzzleBorder = this.add.rectangle(0, 0, 600, 300).setStrokeStyle(3, 0x4b6ef2).setOrigin(0);
    const puzzleTitle = this.add.text(300, 30, 'Code Defuse', {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: '#d7e6ff',
    }).setOrigin(0.5);
    this.puzzleText = this.add.text(40, 90, '', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#e7f2ff',
      wordWrap: { width: 520 },
    });
    this.answerText = this.add.text(40, 200, 'Answer:', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#b7c7ff',
    });
    this.answerInput = this.add.dom(420, 200, 'input', {
      width: '260px',
      height: '32px',
      background: '#0f1a36',
      color: '#ffffff',
      border: '2px solid #4b6ef2',
      borderRadius: '8px',
      padding: '8px 10px',
      fontFamily: 'monospace',
      fontSize: '16px',
      outline: 'none',
    });
    const instructions = this.add.text(300, 260, 'Type an answer and click Submit or press ENTER', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#a8b0ff',
    }).setOrigin(0.5);

    this.puzzleSubmitButton = this.add.dom(300, 296, 'button', {
      width: '180px',
      height: '34px',
      background: '#4d6cff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }, 'SUBMIT');
    this.puzzleSubmitButton.addListener('click');
    this.puzzleSubmitButton.on('click', () => this.submitAnswer());
    this.puzzleInput = this.answerInput.node;

    // Add Enter key listener directly to the input element
    this.puzzleInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.submitAnswer();
      }
    });

    this.puzzleContainer.add([puzzleBg, puzzleBorder, puzzleTitle, this.puzzleText, this.answerText, this.answerInput, instructions, this.puzzleSubmitButton]);

    this.answerBuffer = '';
    this.input.keyboard.on('keydown', (event) => {
      if (!this.showingPuzzle) return;
      if (event.key === 'Enter') {
        this.submitAnswer();
      }
    });

    this.physics.add.collider(this.bullets, platforms, (bullet) => bullet.destroy());
    // Levels already defined at start of create()
  }

  openPuzzle() {
    this.showingPuzzle = true;
    this.puzzleInput.value = '';
    const stageData = this.levels[this.currentLevelIndex][this.currentStage];
    this.puzzleText.setText(stageData.clue);
    this.puzzleContainer.setVisible(true);
    this.guideText.setText('Solve the puzzle: ' + (stageData.hint ? stageData.hint.substring(0, 50) : 'Use your code sense.'));
  }

  spawnEnemies() {
    this.enemies.clear(true, true);
    this.bomb.enemyCount = this.levels[this.currentLevelIndex].enemies;
    this.bomb.enemiesDefeated = 0;
    for (let i = 0; i < this.bomb.enemyCount; i++) {
      const enemy = this.enemies.create(700 - i * 80, 400 + Math.random() * 60, null);
      enemy.setFillStyle(0xd95454);
      enemy.setSize(34, 46);
      enemy.setBounce(0.2);
      enemy.setVelocityX(Phaser.Math.Between(-100, -50));
      enemy.health = 1;
    }
  }

  closePuzzle(success = false) {
    this.showingPuzzle = false;
    this.puzzleContainer.setVisible(false);
    if (success) {
      if (this.currentStage === 'training') {
        this.currentStage = 'mission';
        const levelNumber = this.currentLevelIndex + 1;
        this.levelText.setText(`Level ${levelNumber} • ${this.levels[this.currentLevelIndex].name}`);
        this.guideText.setText('Training complete! Enemies incoming. Defuse the mission bomb!');
        this.spawnEnemies();
      } else {
        this.currentLevelIndex += 1;
        if (this.currentLevelIndex >= this.levels.length) {
          this.guideText.setText('You finished all missions. You are ready to code in the field!');
          this.levelText.setText('All Levels Complete');
          this.currentStage = 'complete';
          this.bomb.destroy();
          this.enemies.clear(true, true);
        } else {
          const levelNumber = this.currentLevelIndex + 1;
          this.currentStage = 'training';
          this.levelText.setText(`Level ${levelNumber} • ${this.levels[this.currentLevelIndex].name}`);
          this.guideText.setText('New level unlocked. Inspect the training bomb to continue.');
          this.enemies.clear(true, true);
        }
      }
    } else {
      this.guideText.setText('Incorrect answer. Study the hint and try again!');
    }
  }

  submitAnswer() {
    const stageData = this.levels[this.currentLevelIndex][this.currentStage];
    const answer = this.puzzleInput.value.trim().toLowerCase();
    const validAnswers = stageData.answer.map((a) => a.toLowerCase().trim());
    if (validAnswers.includes(answer)) {
      this.closePuzzle(true);
    } else {
      this.guideText.setText('Not quite. Think about how programming works and try again.');
      this.puzzleInput.value = '';
    }
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-220);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(220);
    } else {
      this.player.setVelocityX(0);
    }

    if ((this.cursors.up.isDown || this.cursors.up2.isDown) && this.player.body.blocked.down) {
      this.player.setVelocityY(-430);
    }

    if (this.currentStage === 'mission') {
      this.enemies.children.entries.forEach((enemy) => {
        if (enemy.active && enemy.x < 100) {
          enemy.destroy();
          this.guideText.setText('An enemy slipped past! Focus on the puzzle and eliminate them faster.');
        }
      });

      this.physics.overlap(this.bullets, this.enemies, (bullet, enemy) => {
        enemy.destroy();
        bullet.destroy();
        this.bomb.enemiesDefeated += 1;
        if (this.bomb.enemiesDefeated === this.bomb.enemyCount) {
          this.guideText.setText('All enemies down! Now inspect the bomb to defuse it.');
        } else {
          this.guideText.setText(`Enemies down: ${this.bomb.enemiesDefeated}/${this.bomb.enemyCount}`);
        }
      });
    }

    if (this.currentStage === 'mission' && this.bomb.enemyCount > 0) {
      this.enemyCountText.setText(`Enemies: ${this.bomb.enemiesDefeated}/${this.bomb.enemyCount}`);
    }

    this.nearBomb = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.bomb.x, this.bomb.y) < 80;
    if (this.nearBomb && !this.showingPuzzle) {
      if (!this.hintText) {
        this.hintText = this.add.text(420, 110, 'Press E to inspect the bomb', {
          fontFamily: 'monospace',
          fontSize: '18px',
          color: '#ffffff',
        }).setDepth(10);
      }
      this.hintText.setVisible(true);
    } else if (this.hintText) {
      this.hintText.setVisible(false);
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

  return <div className="phaser-container" ref={containerRef} />;
}
