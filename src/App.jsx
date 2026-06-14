import PhaserGame from './PhaserGame';

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="jam-badge">June Solstice Game Jam</p>
          <h1>TiTIkBoom</h1>
          <p className="subtitle">A pixel-powered coding defuse adventure with React + Phaser.</p>
        </div>
      </header>
      <main className="game-frame">
        <PhaserGame />
        <aside className="info-panel">
          <h2>How to play</h2>
          <ul>
            <li>Use A / D or ← / → to move.</li>
            <li>Press W / ↑ to jump.</li>
            <li>Press Z to toggle 0 / 1 bullets.</li>
            <li>Press Space to shoot.</li>
            <li>Press E near a bomb to solve the binary puzzle.</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
