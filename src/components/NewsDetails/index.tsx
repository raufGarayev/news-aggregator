import { useSelector } from 'react-redux'
import { IRootStore } from '../../redux/store'
import './newsDetails.sass'

const NewsDetails = () => {

    const {selectedNews} = useSelector((state: IRootStore) => state.news)

  return (
    <div className="newsDetails">
        <div className="newsDetails-top">
            <div className="newsDetails-img">
                <img src={selectedNews.image ? selectedNews.image : '/innoscripta-logo.svg'} alt={selectedNews.title} />
            </div>

            <div className="newsDetails-content">
                <h2>{selectedNews.title}</h2>
                <p>{selectedNews.content}</p>
            </div>
        </div>
    </div>
  )
}

export default NewsDetails