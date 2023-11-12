import { useDispatch } from "react-redux"
import { categories } from "../../constants/categories"
import './categories.sass'
import { AppDispatch } from "../../redux/store"
import { setNewsFilter } from "../../redux/slices/news/newsSlice"
import { FaFilter } from "react-icons/fa"
import { toggleFilter } from "../../redux/slices/localSlice"

const Categories = () => {

  const dispatch = useDispatch<AppDispatch>()

  const handleCategoryFilter = (category: string) => {
    
    dispatch(setNewsFilter({category, page: 1}))
  }

  const openFiltration = () => {
    dispatch(toggleFilter())
  }
  
  return (
    <div className='categories'>
        {categories.map((category, index) => (
            <div key={index} className="category" onClick={() => handleCategoryFilter(category)}>
                <span>{category}</span>
            </div>
        ))}
        <div className="category" onClick={openFiltration}>
          <FaFilter className="filter-icon" />
        </div>
    </div>
  )
}

export default Categories