import { Button } from 'antd'
import {ReactNode} from 'react'
import './customButton.sass'

type CustomButtonProps = {
  children: ReactNode,
  onClick?: (value1?: any, value2?: any) => void,
  type?: 'main' | 'general' | 'cancel' | 'fullWidth'
}

const CustomButton = ({children, onClick, type}: CustomButtonProps) => {

  return (
    <Button
        onClick={onClick}
        className={`customButton ${type}`}
    >
        {children}
    </Button>
  )
}

export default CustomButton