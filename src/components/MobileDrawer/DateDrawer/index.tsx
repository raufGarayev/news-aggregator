import {useState} from 'react'
import { DatePicker } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../redux/store'
import dayjs from 'dayjs'
import { setNewsFilter } from '../../../redux/slices/news/newsSlice'
import { setDrawer } from '../../../redux/slices/localSlice'
import CustomButton from '../../common/CustomButton'

const DateDrawer = () => {

    const dispatch = useDispatch<AppDispatch>()
    const {newsFilters} = useSelector((state: IRootStore) => state.news)
    const [localDate, setLocalDate] = useState<any>(newsFilters.dateRange)

    const handleDateFilters = () => {
        dispatch(setNewsFilter({dateRange: {first_date: localDate[0], last_date: localDate[1]}, page: 1}))
        dispatch(setDrawer({type: 'default'}))
    }

    const clearDateFilters = () => {
        dispatch(setNewsFilter({dateRange: {first_date: null, last_date: null}, page: 1}))
        dispatch(setDrawer({type: 'default'}))
    }

  return (
    <div className='dateDrawer'>
        <div className="dateDrawer-item">
            <span className='date-label'>From date:</span>
            <DatePicker 
                value={localDate[0] ? dayjs(localDate[0], 'YYYY-MM-DD') : undefined} 
                onChange={(e) => setLocalDate([e, localDate[1]])}
            />
        </div>
        <div className="dateDrawer-item">
            <span className='date-label'>To date:</span>
            <DatePicker 
                value={localDate[1] ? dayjs(localDate[1], 'YYYY-MM-DD') : undefined}
                onChange={(e) => setLocalDate([localDate[0], e])}
            />
        </div>
        <div className="dateDrawer-item">
            <CustomButton onClick={handleDateFilters} type={'fullWidth'}>Sate date filters</CustomButton>
        </div>
        {(localDate[0] || localDate[1]) && (
            <div className="dateDrawer-item">
            <CustomButton onClick={clearDateFilters} type={'fullWidth'}>Clear date filters</CustomButton>
        </div>)}
    </div>
  )
}

export default DateDrawer