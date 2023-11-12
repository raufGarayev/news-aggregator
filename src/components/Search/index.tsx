import {useState} from 'react'
import { Input } from "antd"
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { setNews, setNewsFilter } from "../../redux/slices/news/newsSlice"
import './search.sass'

const Search = ({mobile}: {mobile?: boolean}) => {

  const dispatch = useDispatch<AppDispatch>()
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleSearchQuery = () => {
    dispatch(setNews([]))
    dispatch(dispatch(setNewsFilter({search: searchInput, page: 1})))
  }

  const handleClearInput = () => {
    setSearchInput('')
    dispatch(dispatch(setNewsFilter({search: '', page: 1})))
  }

  return (
    <div className={`search-container ${mobile ? 'mobile' : ''}`}>
        <Input 
          placeholder="Search for news" 
          className="search-input" 
          value={searchInput} 
          onChange={handleSearch}
          onPressEnter={handleSearchQuery}
        />
        <AiOutlineSearch className="search-icon" />
        {searchInput && <AiOutlineClose className="clear-icon" onClick={handleClearInput} />}
    </div>
  )
}

export default Search