import {useContext} from 'react'
import {FiLogIn, FiLogOut} from 'react-icons/fi'
import {TbFilterStar} from 'react-icons/tb'
import {FaAngleRight} from 'react-icons/fa'
import {LiaUserCogSolid} from 'react-icons/lia'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { setDrawer } from '../../../redux/slices/localSlice'
import { UserContext } from '../../../context/UserContext'
import { setUserNewsFilters } from '../../../redux/slices/news/newsSlice'


const DrawerItem = ({ type, icon, text }: { type: string, icon: JSX.Element, text: string }) => {
    const dispatch = useDispatch<AppDispatch>();
  
    return (
      <div className="mobileDrawer-content_item" onClick={() => dispatch(setDrawer({type}))}>
        <div className='mobileDrawer-content_item-holder'>
          {icon}
          <span className='mobileDrawer-content_item_text'>{text}</span>
        </div>
        <FaAngleRight className="mobileDrawer-content_item_icon" />
      </div>
    );
  };

  const DefaultDrawer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, setUser } = useContext(UserContext);
  
    const handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('userFilters');
      dispatch(setUserNewsFilters({}));
      dispatch(setDrawer({ open: false, type: '' }));
      setUser({ username: '', password: '' });
    };
  
    return (
      <div className="mobileDrawer-content">
        {user.username 
          ? <DrawerItem type='userPreferences' icon={<LiaUserCogSolid className="mobileDrawer-content_item_icon" />} text='News preferences' />
          : <DrawerItem type='login' icon={<FiLogIn className="mobileDrawer-content_item_icon" />} text='Login' />
        }
        <DrawerItem type='sources' icon={<TbFilterStar className="mobileDrawer-content_item_icon" />} text='Sources' />
        <DrawerItem type='categories' icon={<TbFilterStar className="mobileDrawer-content_item_icon" />} text='Categories' />
        <DrawerItem type='date' icon={<TbFilterStar className="mobileDrawer-content_item_icon" />} text='Date' />
        {user.username && (
          <div className="mobileDrawer-content_item" onClick={handleLogout}>
            <div className='mobileDrawer-content_item-holder'>
              <FiLogOut className="mobileDrawer-content_item_icon" />
              <span className='mobileDrawer-content_item_text'>Logout</span>
            </div>
          </div>
        )}
      </div>
    );
  };

export default DefaultDrawer