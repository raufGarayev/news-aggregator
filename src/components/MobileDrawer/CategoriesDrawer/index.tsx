import { FaAngleRight } from 'react-icons/fa'
import { categories } from '../../../constants/categories'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../redux/store'
import { setNewsFilter } from '../../../redux/slices/news/newsSlice'
import { setDrawer } from '../../../redux/slices/localSlice'
import CustomButton from '../../common/CustomButton'

const CategoriesDrawer = () => {

    const dispatch = useDispatch<AppDispatch>()
    const {newsFilters} = useSelector((state: IRootStore) => state.news)

    const handleCategoryChoise = (category: string) => {
        dispatch(setNewsFilter({category, page: 1}))
        dispatch(setDrawer({type: 'default'}))
    }

    const clearCategoriesFilter = () => {
        dispatch(setNewsFilter({category: '', page: 1}))
        dispatch(setDrawer({type: 'default'}))
    }

  return (
    <div className='mobileDrawer-content'>
        {categories.map((category, index) => (
            <div key={index} className='mobileDrawer-content_item' onClick={() => handleCategoryChoise(category)}>
                <span className='mobileDrawer-content_item_text'>{category}</span>
                <FaAngleRight className="mobileDrawer-content_item_icon" />
            </div>
        ))}
        {newsFilters.category && (
            <div style={{marginTop: 20}}>
                <CustomButton onClick={clearCategoriesFilter} type={'fullWidth'}>Clear categories filter</CustomButton>
            </div>
        )}
    </div>
  )
}

export default CategoriesDrawer