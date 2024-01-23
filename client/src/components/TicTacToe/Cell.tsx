import XMark from 'assets/icon-x.svg';
import OMark from 'assets/icon-o.svg';
import React from 'react';
import { Image } from '@mantine/core';

interface Props {
  data: string;
  onClick: () => void;
}

const getIcon = (data: string) => {
  if (data === 'X') return XMark;
  else if (data === 'O') return OMark;
  return '';
};

const Cell: React.FC<Props> = (props) => {
  const { data, onClick } = props;

  return (
    <div
      className="
      flex items-center justify-center
      inner-shadow-dark bg-dark-100 hover:bg-dark-200 rounded-xl 
      cursor-pointer active:scale-95 transition-all"
      onClick={onClick}
    >
      <Image w="60%" className="" src={getIcon(data)} />
    </div>
  );
};

export default Cell;
