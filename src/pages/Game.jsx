import ChessBoard from "../components/Chessboard";
import { Chess } from "chess.js";
import { useState, useRef } from "react";
import Galaxy from "../components/Galaxy";

function Game() {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  function randomMove() {
    if (chessGame.isGameOver()) return;

    const moves = chessGame.moves();
    const random = moves[Math.floor(Math.random() * moves.length)];

    chessGame.move(random);
    setChessPosition(chessGame.fen());
  }

  function onPieceDrop({ sourceSquare, targetSquare }) {
    if (chessGame.isGameOver()) return false;
    if (!targetSquare) return false;

    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      setChessPosition(chessGame.fen());

      if (!chessGame.isGameOver()) {
        setTimeout(randomMove, 2500);
      }

      return true;
    } catch {
      return false;
    }
  }

  const historyy = chessGame.history({ verbose: true });

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    allowAutoScroll: true,
    id: "my-board",
    boardStyle: {
      width: "500px",
      height: "500px",
      margin: "0 auto",
    },
  };

  let status = "";
  let statusClass = "";

  if (chessGame.isCheckmate()) {
    status =
      chessGame.turn() === "w"
        ? "♚ Black Wins by Checkmate!"
        : "♔ White Wins by Checkmate!";
    statusClass = "status-checkmate";
  } else if (chessGame.isStalemate()) {
    status = "🤝 Draw by Stalemate";
    statusClass = "status-draw";
  } else if (chessGame.isThreefoldRepetition()) {
    status = "🤝 Draw by Threefold Repetition";
    statusClass = "status-draw";
  } else if (chessGame.isInsufficientMaterial()) {
    status = "🤝 Draw by Insufficient Material";
    statusClass = "status-draw";
  } else if (chessGame.isDraw()) {
    status = "🤝 Draw";
    statusClass = "status-draw";
  } else if (chessGame.inCheck()) {
    if (chessGame.turn() === "w") {
      status = "⚠ White is in Check";
    } else {
      status = "⚠ Black is in Check";
    }
    statusClass = "status-check";
  } else {
    if (chessGame.turn() === "w") {
      status = "⚪ White to Move";
    } else {
      status = "⚫ Black to Move";
    }
    statusClass = chessGame.turn() === "w" ? "turn-white" : "turn-black";
  }

  return (
    <div className="game-container">
      <div className="galaxy-layer">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      <div className="game-content">
        <div className="board-panel">

          <div className={`turn-pill ${statusClass}`}>
            <span className="turn-dot" />
            {status}
          </div>

          <div className="game-grid">

            <div className="board-frame">
              <div className="board-wrap">
                <ChessBoard options={chessboardOptions} />
              </div>
            </div>

            <div className="game-history">
              <h2>Game History</h2>

              <ol>
                {historyy.map((move, index) => (
                  <li key={index}>
                    {move.from} → {move.to}
                  </li>
                ))}
              </ol>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;