import { DatePicker, Select } from 'antd'
import { categories } from '../../constants/categories'
import { IoFilterSharp } from 'react-icons/io5'
import './filterBar.sass'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../redux/store'
import { toggleFilter } from '../../redux/slices/localSlice'
import { setNewsFilter } from '../../redux/slices/news/newsSlice'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { getSourcesFromNewsApi } from '../../redux/slices/news/action'

const FilterBar = () => {

    const dispatch = useDispatch<AppDispatch>()
    const {newsFilters, sources} = useSelector((state: IRootStore) => state.news)

    const handleCloseFilterBar = () => {
        dispatch(toggleFilter())
        dispatch(setNewsFilter({}))
    }

    const handleFiltrationChoose = (value: string, type: string) => {
        if(type === 'category') {
            dispatch(setNewsFilter({category: value, page: 1}))
        } else {
            dispatch(setNewsFilter({source: value, page: 1}))
        }
    }

    const handleDateFilterChoose = (_: any, dateStrings: string[]) => {
        dispatch(setNewsFilter({dateRange: {first_date: dateStrings[0], last_date: dateStrings[1]}, page: 1}))
    }

    useEffect(() => {
        dispatch(getSourcesFromNewsApi())
    }, [])

  return (
    <div className='filterBar'>
        <div className="filterBar-category">
            <Select 
                placeholder="Select category" 
                style={{ width: 150 }} 
                onSelect={(e) => handleFiltrationChoose(e, 'category')}
                allowClear={true}
                onClear={() => handleFiltrationChoose('', 'category')}
                value={newsFilters.category ? newsFilters.category : undefined}
            >
                {categories.map((category, index) => (
                    <Select.Option key={index} value={category}>{category}</Select.Option>
                ))}
            </Select>
        </div>
        <div className="filterBar-source">
            <Select 
                placeholder="Select source" 
                style={{ width: 150 }} 
                onSelect={(e) => handleFiltrationChoose(e, 'source')}
                allowClear={true}
                onClear={() => handleFiltrationChoose('', 'source')}
                value={newsFilters.source ? newsFilters.source : undefined}
            >
                {sources.map((source, index) => (
                    <Select.Option key={index} value={source.id}>{source.name}</Select.Option>
                ))}
            </Select>
        </div>
        <div className="filterBar-date">
            <DatePicker.RangePicker
                value={newsFilters.dateRange.first_date ? [dayjs(newsFilters.dateRange.first_date), dayjs(newsFilters.dateRange.last_date)] : undefined}
                onChange={handleDateFilterChoose}  
            />
        </div>
        <IoFilterSharp className="close-filter-icon" onClick={handleCloseFilterBar} />
    </div>
  )
}

export default FilterBar