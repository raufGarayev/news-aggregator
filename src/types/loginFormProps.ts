import { FormInstance } from 'antd/es/form';

export interface LoginFormProps {
    form: FormInstance;
    forumFinish?: () => void;
}
