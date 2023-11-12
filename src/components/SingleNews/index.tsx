import { formatRelativeTime } from '../../utils/timerFormat'
import {BiTimeFive} from 'react-icons/bi'
import { NewsItem } from '../../types/news'
import './singleNews.sass'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { toggleModal } from '../../redux/slices/localSlice'
import { setSelectedNews } from '../../redux/slices/news/newsSlice'

const SingleNews = ({
    title,
    content,
    image,
    source,
    timestamp,
    url
}: NewsItem) => {

    const dispatch = useDispatch<AppDispatch>()

    const handleShowNews = () => {
        dispatch(toggleModal('news'))
        dispatch(setSelectedNews({title, content, image, source, timestamp, url}))
    }

  return (
    <div className='newsItem' onClick={handleShowNews}>
        <div className="newsItem-img">
        <img src={image ? image : '/innoscripta-logo.svg'} alt={title} />
        </div>
        <div className="newsItem-info">
            <div className="newsItem-info_titles">
                <h3>{title?.length > 50 ? title.slice(0, 50) + '...' : title}</h3>
                <p>{content?.length > 100 ? content.slice(0, 100) + '...' : content}</p>

            </div>
            <div className="newsItem-info_bottom">
                <span className='timer'>
                    <BiTimeFive className="timer-icon" /> 
                    {formatRelativeTime(timestamp)}
                </span>
                <span>{source}</span>
             </div>
        </div>
    </div>
  )
}

export default SingleNews