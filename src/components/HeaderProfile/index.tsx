import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import './headerProfile.sass'
import { AppDispatch, IRootStore } from "../../redux/store"
import { toggleModal } from "../../redux/slices/localSlice"
import CustomButton from "../common/CustomButton"
import { Dropdown, Tooltip } from "antd"
import type { MenuProps } from 'antd';
import { items } from "../../utils/profileItems"
import { FaAngleDown } from "react-icons/fa"
import {BsPersonFillLock, BsPersonFillCheck } from 'react-icons/bs'
import { useNavigate } from "react-router-dom"
import CustomModal from "../common/CustomModal"
import UserFeedSettings from "../UserFeedSettings"
import { NewsStateType } from '../../types/news'
import { handleUserFiltersGlobally } from '../../utils/handleUserFiltersGlobally'

const HeaderProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {}
    const {modal} = useSelector((state: IRootStore) => state.local)
    const {userFilters, newsFilters} = useSelector((state: IRootStore) => state.news)
    const [userLocalFilters, setUserLocalFilters] = useState<NewsStateType['userFilters']>(userFilters)

    const handleLogin = () => {
        dispatch(toggleModal('general'))
    }

    useEffect(() => {
        setUserLocalFilters(userFilters);
    }, [userFilters]);

    const onMenuKeyClick: MenuProps['onClick'] = ({key}) => {
        if(key === '1') {
            localStorage.removeItem('user')
            localStorage.removeItem('userFilters')
            navigate(window.location.pathname, { replace: true });

        } else if (key === '0') {
            dispatch(toggleModal('preferences'))
        }
    }
    
  return (
    <div className="headerProfile">
        {user.username ? (
            <Dropdown menu={{items, onClick: onMenuKeyClick }} placement="bottomLeft" trigger={['click']} >
                <div className="profile">
                    <Tooltip title={`Customized feed is ${newsFilters.search !== '' ? 'off due to search' : 'on'}`}>
                        {newsFilters.search !== '' ? <BsPersonFillLock style={{fontSize: '1.2rem'}} /> : <BsPersonFillCheck style={{fontSize: '1.2rem'}} />}
                        
                    </Tooltip>
                    <span>{user.username}</span>
                    <FaAngleDown />
                </div>  
            </Dropdown>
        ) : (
            <CustomButton
                onClick={handleLogin}
                type="main"
            >
                Login
            </CustomButton>
        )}
        {(modal.type === 'preferences') && (
            <CustomModal
                footerModal={
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <CustomButton type="cancel" onClick={() => dispatch(toggleModal(''))}>Cancel</CustomButton>
                        <CustomButton onClick={() => handleUserFiltersGlobally(dispatch, userLocalFilters)} type="general">Save</CustomButton>
                    </div>
                }
            >
                <UserFeedSettings state={userLocalFilters} setFiltersState={setUserLocalFilters} />
            </CustomModal>
        )}
    </div>
  )
}

export default HeaderProfile