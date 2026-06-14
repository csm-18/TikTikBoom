import PhaserGame from './PhaserGame';

export default function App() {
  return (
    <div className="app-shell">
      {/* Dynamic embedded styling to guarantee Bletchley Park cyberpunk theme looks stunning without separate CSS setup */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #030611;
          color: #fff;
          font-family: 'Courier New', Courier, monospace;
        }
        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }
        .app-header {
          width: 100%;
          max-width: 1240px;
          text-align: left;
          margin-bottom: 24px;
          border-bottom: 1px solid #1a2647;
          padding-bottom: 15px;
        }
        .jam-badge {
          display: inline-block;
          background: #120b05;
          color: #ffa500;
          border: 1px dashed #ffa500;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0 0 10px 0;
          border-radius: 4px;
        }
        .app-header h1 {
          margin: 0;
          font-size: 32px;
          color: #00d2ff;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(0, 210, 255, 0.3);
        }
        .subtitle {
          margin: 5px 0 0 0;
          color: #8fa0cd;
          font-size: 14px;
        }
        .game-frame {
          display: flex;
          flex-direction: row;
          gap: 24px;
          width: 100%;
          max-width: 1240px;
          justify-content: center;
          align-items: flex-start;
        }
        .info-panel {
          background: #0c132a;
          border: 1px solid #1d2c56;
          border-radius: 8px;
          padding: 24px;
          width: 280px;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .info-panel h2 {
          color: #00ffcc;
          font-size: 18px;
          margin-top: 0;
          margin-bottom: 16px;
          text-transform: uppercase;
          border-bottom: 1px solid #1d2c56;
          padding-bottom: 8px;
          letter-spacing: 1px;
        }
        .info-panel ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .info-panel li {
          margin-bottom: 16px;
          font-size: 13px;
          line-height: 1.5;
          color: #e2e8f0;
        }
        .key-cap {
          background: #1a2647;
          border: 1px solid #3b528c;
          border-radius: 4px;
          padding: 2px 6px;
          color: #00d2ff;
          font-weight: bold;
          font-size: 12px;
        }
        .tip-box {
          margin-top: 20px;
          background: #121005;
          border: 1px solid #e5c15844;
          padding: 10px;
          border-radius: 4px;
          font-size: 12px;
          color: #e5c158;
        }
        @media (max-width: 1200px) {
          .game-frame {
            flex-direction: column;
            align-items: center;
          }
          .info-panel {
            width: 960px;
          }
        }
      `}</style>

      <header className="app-header">
        <div>
          <p className="jam-badge">June Solstice Game Jam Entry</p>
          <h1>TURING'S ENIGMA</h1>
          <p className="subtitle">The Solstice Protocol — A pixel-powered algorithmic hacking defuse platformer built with React + Phaser.</p>
        </div>
      </header>

      <main className="game-frame">
        {/* Game Canvas Container */}
        <PhaserGame />

        {/* Side Instruction Matrix */}
        <aside className="info-panel">
          <h2>How to play</h2>
          <ul>
            <li>
              <span className="key-cap">A</span> / <span className="key-cap">D</span> Move Horizontal Node Left and Right.
            </li>
            <li>
              <span className="key-cap">W</span> Jump onto layout platforms.
            </li>
            <li>
              <span className="key-cap">Z</span> Toggle Core Binary Tape <span style={{color: '#00d2ff'}}>0</span> / <span style={{color: '#ffa500'}}>1</span> states.
            </li>
            <li>
              <span className="key-cap">SPACE</span> Fire decryption matrix beams.
            </li>
            <li>
              <span className="key-cap">E</span> Interface with the Turing Bombe terminal machine.
            </li>
          </ul>

          <div className="tip-box">
            <strong>SYSTEM LOOP:</strong><br />
            1. Press <span className="key-cap">E</span> for <strong>Training</strong> question.<br />
            2. Wipe out runtime glitches.<br />
            3. Press <span className="key-cap">E</span> again for <strong>Mission</strong> question to unlock the next dynamic sector layout!
          </div>
        </aside>
      </main>
    </div>
  );
}