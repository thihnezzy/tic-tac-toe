import { Input } from '@mantine/core';
import React, { Suspense, useState } from 'react';
import GameMenu from '../components/TicTacToe/GameMenu';
import Board from '../components/TicTacToe/Board';
import useSocket from '../hooks/useSocket';
import { Button } from '../components/ui';

type GameMode = 'multi-player' | 'player-vs-cpu' | '';

const ModalGameOver = React.lazy(
  () => import('../components/TicTacToe/ModalGameOver')
);
const Home = () => {
  const { board, makeMove, joinRoom } = useSocket('thihnezzy', true);
  const [opened, setOpened] = useState<boolean>(false);
  const [room, setRoom] = useState('');
  const [gameMode, setGameMode] = useState<
    'multi-player' | 'player-vs-cpu' | ''
  >('');
  const [playerMark, setPlayerMark] = useState<'X' | 'O'>('X');
  const [modalType, setModalType] = useState<
    'win' | 'lose' | 'draw' | 'restart'
  >('draw');
  const [xTurn, setXTurn] = useState<boolean>(true);
  function onClickCellHandler(i: number): void {
    makeMove(i);
    setXTurn(!xTurn);
  }

  function onRestartHandler() {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      {/* <GameMenu
        setGameMode={setGameMode}
        playerMark={playerMark}
        setPlayerMark={setPlayerMark}
      /> */}

      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            joinRoom(room);
            setRoom('');
          }}
          className="flex items-center justify-center gap-2 my-2"
        >
          <Input
            type="text"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
          />
          <Button className="btn btn-primary !w-fit px-2" type="submit">
            join
          </Button>
        </form>
        <Board
          xTurn={xTurn}
          board={board}
          onClickCellHandler={(i) => onClickCellHandler(i)}
          onClickRestartHandler={() => {
            setOpened(true);
            setModalType('restart');
          }}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <ModalGameOver
            opened={opened}
            onClose={() => setOpened(false)}
            type={modalType}
            xWin={true}
            onQuit={() => setOpened(false)}
            onNextRound={() => setOpened(false)}
            onRestart={() => {
              setOpened(false);
              onRestartHandler();
            }}
          />
        </Suspense>
      </>
    </>
  );
};

export default Home;
