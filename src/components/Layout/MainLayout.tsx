import {useContext, useEffect } from 'react'
import { Form, Layout } from "antd"
import AppRoutes from "../../routes/AppRoutes"
import './MainLayout.sass'
import Search from "../Search"
import HeaderProfile from "../HeaderProfile"
import CustomModal from "../common/CustomModal"
import CustomButton from "../common/CustomButton"
import { mainLogo } from "../../constants/logo"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { setDrawer, toggleModal } from "../../redux/slices/localSlice"
import { UserContext } from "../../context/UserContext"
import { useSelector } from "react-redux"
import { IRootStore } from "../../redux/store"
import { setNews, setUserNewsFilters } from '../../redux/slices/news/newsSlice'
import { GiHamburgerMenu } from 'react-icons/gi'
import MobileDrawer from '../MobileDrawer'
import LoginForm from '../LoginForm'

const { Header, Content } = Layout

const MainLayout = () => { 

  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>()
  const {setUser} = useContext(UserContext)
  const {modal} = useSelector((state: IRootStore) => state.local)

  const handleLogin = () => {
    const values = form.getFieldsValue();
    if(values.username === 'admin' && values.password === '12345') {
      dispatch(toggleModal(''))
      dispatch(setDrawer({open: false, type: ''}))
      setUser(values)
      localStorage.setItem('user', JSON.stringify(values))
    } else {
      form.setFieldsValue({
        username: '',
        password: ''
      })
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {}
    const userFilters = localStorage.getItem('userFilters') ? JSON.parse(localStorage.getItem('userFilters')!) : {}
    if(user.username) {
      setUser(user)
    }
    if(userFilters) {
      Object.keys(userFilters).forEach((key: keyof typeof userFilters) => {
        if(userFilters[key].length > 0) {
          dispatch(setNews([]))
          dispatch(setUserNewsFilters(userFilters))
        }})
    }
  }, [])

  return (
    <Layout>
      <Header
        className="header"
      >
        <a href="/" className="header-logo" dangerouslySetInnerHTML={{ __html: mainLogo }} />
        <Search mobile={false} />
        <HeaderProfile />
        <GiHamburgerMenu className="header-burger" onClick={() => dispatch(setDrawer({open: true, type: 'default'}))} />
    </Header>
      <Layout>
        <Content><AppRoutes /></Content>
        <MobileDrawer form={form} forumFinish={handleLogin} />
      </Layout>
      {modal.type === 'general' && (
        <CustomModal
          footerModal={
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <CustomButton type="cancel" onClick={() => dispatch(toggleModal(''))}>Cancel</CustomButton>
              <CustomButton onClick={handleLogin} type="general">Login</CustomButton>
            </div>
          }
        >
          <LoginForm form={form} forumFinish={handleLogin} />
      </CustomModal>
      )}
    </Layout>
  )
}

export default MainLayout