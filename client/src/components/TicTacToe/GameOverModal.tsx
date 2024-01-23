import Modal  from 'react-modal';
import Button from '../ui/Button';


interface Props {
  isOpen: boolean;
  winner: string;
  onRestart: () => void;
}


const GameOverModal: React.FC<Props> = (props) => {
  const { isOpen, winner, onRestart } = props;

  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-center">
          {winner === 'draw' ? 'Draw' : `${winner} won!`}
        </div>
        <div className="mt-4">
          <Button onClick={onRestart}>Play Again</Button>
        </div>
      </div>
    </Modal>
  )
}

export default GameOverModal;