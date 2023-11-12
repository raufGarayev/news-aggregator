import {useEffect}from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../redux/store'
import { setNewsFilter } from '../../../redux/slices/news/newsSlice'
import { setDrawer } from '../../../redux/slices/localSlice'
import { getSourcesFromNewsApi } from '../../../redux/slices/news/action'
import CustomButton from '../../common/CustomButton'

const SourcesDrawer = () => {

    const dispatch = useDispatch<AppDispatch>()
    const {sources, newsFilters} = useSelector((state: IRootStore) => state.news)

    const handleSourceChoise = (source: string) => {
        dispatch(setNewsFilter({source, page: 1}))
        dispatch(setDrawer({type: 'default'}))
    }

    useEffect(() => {
        dispatch(getSourcesFromNewsApi())
    }, [])

    const clearSourcesFilter = () => {
        dispatch(setNewsFilter({source: '', page: 1}))
        dispatch(setDrawer({type: 'default'}))
    }

  return (
    <div className='mobileDrawer-content'>
        {sources.length > 0 ? (
            <>
                {sources.map((source, index) => (
                    <div key={index} className='mobileDrawer-content_item' onClick={() => handleSourceChoise(source.name)}>
                        <span className='mobileDrawer-content_item_text'>{source.name}</span>
                        <FaAngleRight className="mobileDrawer-content_item_icon" />
                    </div>
                ))}
                {newsFilters.source && (
                    <div style={{marginTop: 20}}>
                        <CustomButton onClick={clearSourcesFilter} type={'fullWidth'}>Clear sources filter</CustomButton>
                    </div>
                )}
            </>
        ): (
            <div className='mobileDrawer-content_item'>
                <span className='mobileDrawer-content_item_text'>NewsApi limit expired or you didn't enter website through localhost (NewsApi blocks requests which is not from localhost)</span>
            </div>
        
        )}
        
    </div>
  )
}

export default SourcesDrawer