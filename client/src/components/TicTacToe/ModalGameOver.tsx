import React from 'react';
import { Image, Modal, Text } from '@mantine/core';
import { Button } from '../ui';
import XMark from 'assets/icon-x.svg';
import OMark from 'assets/icon-o.svg';
interface Props {
  opened: boolean;
  onClose: () => void;
  onQuit: () => void;
  onNextRound: () => void;
  onRestart: () => void;
  type: 'win' | 'lose' | 'draw' | 'restart';
  xWin: boolean;
}

const PLAYER_LOST = 'OH NO! YOU LOST...';
const PLAYER_WIN = 'YOU WON!';
const RESTART = 'RESTART GAME?';
const DRAW = 'ROUND TIED';
const getPlayerWin = (player: string) => {
  return player + 'WIN!';
};

const ModalGameOver: React.FC<Props> = (props) => {
  const { opened, onClose, type, xWin, onNextRound, onQuit, onRestart } = props;
  return (
    <Modal
      withCloseButton={false}
      opened={opened}
      onClose={onClose}
      overlayProps={{ blur: 0.4, opacity: 0.9 }}
      size="100vw"
      m={0}
      p={0}
      classNames={{
        inner: '!p-0',
        content:
          '!rounded-none !min-h-[220px] !bg-dark-200 !flex !flex-col justify-center items-center',
      }}
      closeOnEscape={false}
      centered
    >
      {type !== 'restart' ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <small className="text-light-200 font-bold">{PLAYER_LOST}</small>
          <div className="flex items-center justify-center gap-4">
            <Image w={64} src={xWin ? XMark : OMark} />
            <Text
              fw={700}
              className={`uppercase !text-3xl ${
                xWin ? '!text-primary-200' : '!text-secondary-200'
              }`}
            >
              Takes the round
            </Text>
          </div>
          <div className="w-fit space-x-4 flex items-center">
            <Button
              className="btn btn-light px-4 inner-shadow-light offset-4"
              onClick={onQuit}
            >
              Quit
            </Button>
            <Button
              className="btn btn-primary text-nowrap px-4 inner-shadow-primary offset-4"
              onClick={onNextRound}
            >
              Next Round
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <span
            className={`uppercase text-4xl text-light-200 font-bold tracking-wider`}
          >
            {RESTART}
          </span>
          <div className="flex space-x-2">
            <Button
              className="btn btn-light inner-shadow-light offset-4 text-nowrap px-4 py-2"
              onClick={onQuit}
            >
              NO, CANCEL
            </Button>
            <Button
              className="btn btn-primary inner-shadow-primary offset-4 text-nowrap px-4 py-2"
              onClick={onRestart}
            >
              YES, RESTART
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalGameOver;
