import {Form, Input} from 'antd'
import { LoginFormProps } from '../../types/loginFormProps';
import CustomButton from '../common/CustomButton';
import { useSelector } from 'react-redux';
import { IRootStore } from '../../redux/store';


const LoginForm: React.FC<LoginFormProps> = ({form, forumFinish}) => {

    const {mobileDrawer} = useSelector((state: IRootStore) => state.local)

  return (
    <Form form={form}>
        <div className="form-info">
            <p>Use next credentials to execute Login:</p>
            <p>Username: <span>admin</span></p>
            <p>Password: <span>12345</span></p>
        </div>
        <Form.Item name={'username'} key="username">
            <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name={'password'} key="password">
            <Input placeholder="Password" />
        </Form.Item>
        {mobileDrawer.open && (
            <Form.Item>
                <CustomButton
                    onClick={forumFinish}
                    type="fullWidth"
                >
                    Login
                </CustomButton>
            </Form.Item>
        )}
    </Form>
  )
}

export default LoginForm