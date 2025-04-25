import React from 'react';
import GameButton from '../../../../components/GameButton';

interface MobileFooterProps {
  gameMode: string;
  switchGameMode: (mode: string) => void;
  restartGame: () => void;
}

export default function MobileFooter({
  gameMode,
  switchGameMode,
  restartGame
}: MobileFooterProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <GameButton
            type={gameMode === "standard" ? "grayNeutral" : "neutral"}
            onClick={() => switchGameMode("standard")}
            size="sm"
          >
            Standard
          </GameButton>
          <GameButton
            type={gameMode === "timed" ? "danger" : "neutral"}
            onClick={() => switchGameMode("timed")}
            size="sm"
          >
            Timed
          </GameButton>
        </div>
        <GameButton
          onClick={restartGame}
          type="neutral"
          size="sm"
        >
          Restart
        </GameButton>
      </div>
    </div>
  );
} 