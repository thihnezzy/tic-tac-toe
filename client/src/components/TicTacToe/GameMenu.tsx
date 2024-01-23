import { SegmentedControl } from '@mantine/core';
import { Button } from '../ui';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  playerMark: 'X' | 'O';
  setPlayerMark: (mark: 'X' | 'O') => void;
  setGameMode: Dispatch<SetStateAction<'' | 'multi-player' | 'player-vs-cpu'>>;
}
const IconO = ({ color }: { color: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
      fill={color}
    />
  </svg>
);

const IconX = ({ color }: { color: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
      fill={color}
      fillRule="evenodd"
    />
  </svg>
);
const GameMenu: React.FC<Props> = (props) => {
  const { setGameMode, playerMark, setPlayerMark } = props;

  return (
    <div className="flex flex-col justify-center items-center min-w-[350px] max-w-[500px] gap-8">
      <div className="flex flex-col items-center w-full h-34 bg-dark-100 gap-4 py-4 rounded-xl inner-shadow-dark">
        <h4 className="text-light-200 uppercase font-bold">
          Pick Player 1's mark
        </h4>
        <div className="w-full px-6">
          <SegmentedControl
            fullWidth
            className="!w-full !bg-dark-200"
            classNames={{
              indicator: '!bg-light-200',
              control: 'm-1',
            }}
            data={[
              {
                label: (
                  <div className="flex justify-center">
                    <IconX color={playerMark !== 'X' ? '#A8BFC9' : '#1A2A33'} />
                  </div>
                ),
                value: 'X',
              },
              {
                label: (
                  <div className="flex justify-center">
                    <IconO color={playerMark !== 'O' ? '#A8BFC9' : '#1A2A33'} />
                  </div>
                ),
                value: 'O',
              },
            ]}
            value={playerMark}
            onChange={(value) => setPlayerMark(value as 'X' | 'O')}
          />
        </div>
        <small className="text-light-200 font-bold uppercase opacity-50 text-xs">
          Remember : X goes first
        </small>
      </div>
      <div className="space-y-4">
        <Button
          onClick={() => setGameMode('multi-player')}
          className="btn btn-primary inner-shadow-primary"
        >
          New Game (Vs Player)
        </Button>
        <Button
          onClick={() => setGameMode('player-vs-cpu')}
          className="btn btn-secondary inner-shadow-secondary"
        >
          New Game (Vs CPU)
        </Button>
      </div>
    </div>
  );
};

export default GameMenu;
