
import { useState, useEffect } from 'react'
import './mobileDrawer.sass'
import {AiOutlineClose} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../redux/store'
import { setDrawer } from '../../redux/slices/localSlice'
import DefaultDrawer from './DefaultDrawer'
import LoginForm from '../LoginForm'
import { LoginFormProps } from '../../types/loginFormProps'
import UserFeedSettings from '../UserFeedSettings'
import { NewsStateType } from '../../types/news'
import CategoriesDrawer from './CategoriesDrawer'
import { MdArrowBack } from 'react-icons/md'
import SourcesDrawer from './SourcesDrawer'
import DateDrawer from './DateDrawer'

const MobileDrawer: React.FC<LoginFormProps> = ({form, forumFinish}) => {

    const dispatch = useDispatch<AppDispatch>()
    const {mobileDrawer} = useSelector((state: IRootStore) => state.local)
    const {userFilters} = useSelector((state: IRootStore) => state.news)
    const [userLocalFilters, setUserLocalFilters] = useState<NewsStateType['userFilters']>(userFilters)


    useEffect(() => {
        setUserLocalFilters(userFilters);
    }, [userFilters]);

    const drawerComponents = {
        default: <DefaultDrawer />,
        login: <LoginForm form={form} forumFinish={forumFinish} />,
        userPreferences: <UserFeedSettings state={userLocalFilters} setFiltersState={setUserLocalFilters} />,
        categories: <CategoriesDrawer />,
        sources: <SourcesDrawer />,
        date: <DateDrawer />
      };

  return (
    <div className={`mobileDrawer ${mobileDrawer.open ? 'drawerOn' : ''}`}>
        <div className="mobileDrawer-top">
            {mobileDrawer.type !== 'default' && <MdArrowBack className="back-icon" onClick={() => dispatch(setDrawer({type: 'default'}))} />}
            <h3>Settings</h3>
            <AiOutlineClose onClick={() => dispatch(setDrawer({open: false, type: ''}))} className="drawer-close-icon" />
        </div>

        {drawerComponents[mobileDrawer.type as keyof typeof drawerComponents]}
    </div>
  )
}

export default MobileDrawer