import { Switch } from "@mantine/core"
import { useState } from "react"
import OMarkOutlineIcon from '../../assets/icon-o-outline.svg'
import XMarkIcon from '../../assets/icon-x.svg'
import OMarkIcon from '../../assets/icon-o.svg'
import XMarkOutlineIcon from '../../assets/icon-x-outline.svg'

interface Props {
  isXMark: boolean
  onChange: () => void
}

const CustomSwitch: React.FC<Props> = (props) => {
  const { isXMark, onChange } = props;
  const XMark = () => (
    <div className=" h-10">
      <img src={XMarkIcon} alt="X Mark" className="w-8 h-8" />
    </div>
  )
  const OMark = () => (
    <div className="w-10 h-10">
      <img src={OMarkIcon} alt="O Mark" className="w-8 h-8" />
    </div>
  )
  
  return (
    <Switch
      onLabel={<XMark />}
      offLabel={<OMark />}
      thumbIcon={
        isXMark ? (
            <img src={XMarkOutlineIcon} alt="X Mark" className="w-8 h-8" />
        ) : (
            <img src={OMarkOutlineIcon} alt="O Mark" className="w-8 h-8" />
        )
      }
      color="#1A2A33"
      size='xl'
      className="w-4/5 !bg-dark-200 rounded-md"
      onChange={onChange}
      classNames={{

        track: 'w-full !rounded-md !flex',
        thumb: '!bg-light-200 !border-none !rounded-md !w-1/2',
        input: '!hidden',
      }}
    />
  )
}


interface Props {
  playerMark: string;
}

const PlayerMarkPicker: React.FC<Props> = () => {
  const [isXMark, setIsXMark] = useState<boolean>(false)
  return (
    <div className='flex flex-col items-center w-full h-34 bg-dark-100 gap-4 py-4 rounded-lg'>
      <h4 className='text-light-200 uppercase font-bold'>Pick Player 1's mark</h4>
      {/* <CustomSwitch 
        isXMark={isXMark} 
        onChange={() => setIsXMark(!isXMark)}
      /> */}
      <small className="text-light-200 font-bold uppercase opacity-50 text-xs">
        Remember : X goes first
      </small>
    </div>
  )
}

export default PlayerMarkPicker
