import { useSelector } from 'react-redux'
import { IRootStore } from '../../redux/store'
import Categories from '../Categories'
import './navbar.sass'
import FilterBar from '../FilterBar'

const Navbar = () => {

    const {filter} = useSelector((state: IRootStore) => state.local)

  return (
    <div className='navbar'>
        {filter.open ? (
            <FilterBar />
        ): (
            <Categories />
        )}
    </div>
  )
}

export default Navbar