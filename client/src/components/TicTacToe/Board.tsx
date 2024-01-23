import React from 'react';
import Cell from './Cell';
import XMark from 'assets/icon-x.svg';
import OMark from 'assets/icon-o.svg';
import XMarkOutline from 'assets/icon-x-outline.svg';
import OMarkOutline from 'assets/icon-o-outline.svg';
import RestartIcon from 'assets/icon-restart.svg';
import { ActionIcon, Container, Image } from '@mantine/core';
interface Props {
  board: string[];
  onClickCellHandler: (i: number) => void;
  xTurn: boolean;
  onClickRestartHandler: () => void;
}

const Board: React.FC<Props> = (props) => {
  const { board, onClickCellHandler, xTurn, onClickRestartHandler } = props;
  const onClick = (i: number) => {
    onClickCellHandler(i);
  };
  return (
    <Container className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image w={32} src={XMark} alt="X Mark" />
          <Image w={32} src={OMark} alt="O Mark" />
        </div>
        <div className="flex items-center justify-center gap-2 bg-dark-100 inner-shadow-dark offset-4 px-6 py-4 rounded-lg">
          <Image
            className="text-light-200 "
            w={20}
            src={xTurn ? XMarkOutline : OMarkOutline}
            color="red"
          />
          <span className="text-light-200 font-bold uppercase text-sm">
            Turn
          </span>
        </div>
        <div>
          <ActionIcon
            variant="solid"
            w={52}
            h={52}
            className="
              !bg-light-200 
              !border-none 
              !hover:bg-light-100 
              inner-shadow-light 
              !active:scale-95 
              transition-all"
            radius={10}
            onClick={onClickRestartHandler}
          >
            <Image w={20} src={RestartIcon} alt="X Mark" />
          </ActionIcon>
        </div>
      </div>
      <div
        className="
        grid
        grid-cols-3
        grid-rows-3
        gap-2
        w-full
        h-80
        sm:w-96
        sm:h-96
        rounded-md
      "
      >
        {board.map((_, i) => {
          return <Cell key={i} data={board[i]} onClick={() => onClick(i)} />;
        })}
      </div>
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <div className="bg-primary-200 rounded-lg py-2 px-4 flex flex-col items-center justify-center">
          <small>X (You)</small>
          <span className="text-md font-bold">0</span>
        </div>
        <div className="bg-light-200 rounded-lg py-2 px-4 flex flex-col items-center justify-center">
          <small>Ties</small>
          <span className="text-md font-bold">0</span>
        </div>
        <div className="bg-secondary-200 rounded-lg py-2 px-4 flex flex-col items-center justify-center">
          <small>O (CPU)</small>
          <span className="text-md font-bold">0</span>
        </div>
      </div>
    </Container>
  );
};

export default Board;
