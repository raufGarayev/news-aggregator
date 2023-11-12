import { useEffect, useState } from 'react'
import SingleNews from '../SingleNews'
import './newsContainer.sass'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../redux/store'
import { setNews, setNewsFilter } from '../../redux/slices/news/newsSlice'
import { NewsItem } from '../../types/news'
import { getGuardianApiQuery, getNYTApiQuery, getNewsApiQuery } from '../../redux/slices/news/action'
import CustomModal from '../common/CustomModal'
import NewsDetails from '../NewsDetails'
import { Spin } from 'antd'
import Search from '../Search'

const NewsContainer = () => {

  const {newsFilters, news, userFilters, guardianApiLoading, nytApiLoading, newsApiLoading, selectedNews} = useSelector((state: IRootStore) => state.news)
  const dispatch = useDispatch<AppDispatch>()
  const [prevFilters, setPrevFilters] = useState(newsFilters)
  const [prevUserFilters, setPrevUserFilters] = useState(userFilters)
  const [filteredNews, setFilteredNews] = useState(news)
  const {modal} = useSelector((state: IRootStore) => state.local)

  useEffect(() => {
    setPrevFilters(newsFilters);
    if (
      prevFilters.category !== newsFilters.category 
      || prevFilters.search !== newsFilters.search 
      || prevFilters.source !== newsFilters.source 
      || prevFilters.dateRange.first_date !== newsFilters.dateRange.first_date 
      || prevFilters.dateRange.last_date !== newsFilters.dateRange.last_date
    ) {
      dispatch(setNews([]));
    }
  }, [newsFilters])

  useEffect(() => {
    setPrevUserFilters(userFilters);
    if (
      prevUserFilters.authors !== userFilters.authors
      || prevUserFilters.categories !== userFilters.categories
      || prevUserFilters.sources !== userFilters.sources
    ) {
      dispatch(setNews([]));
    }
  }, [userFilters])

  useEffect(() => {
    dispatch(getNewsApiQuery({newsFilters, userFilters}))
    dispatch(getGuardianApiQuery({newsFilters, userFilters}))
    dispatch(getNYTApiQuery({newsFilters, userFilters}))

  }, [newsFilters, userFilters])

  useEffect(() => {

    if(newsFilters.search !== '') {
      setFilteredNews(news);
    } else {
      const filteredNews = news.filter((newsItem: NewsItem) => {
        if (userFilters.authors.length > 0 && (newsItem.author === undefined || newsItem.author === null || !userFilters.authors.includes(newsItem.author))) {
          return false;
        }
        return true;
      });
      setFilteredNews(filteredNews);
    }
    
  }, [news, userFilters]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight) {
      handleMoreNews()
    }
  };

  const handleMoreNews = () => {
    setTimeout(() => {
      dispatch(setNewsFilter({
        ...newsFilters,
        page: newsFilters.page + 1
      }))
    }, 1000)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [guardianApiLoading, nytApiLoading, newsApiLoading]);

  return (
    <section className='news-container'>
      <Search mobile={true} />
      {filteredNews.length > 0 ? (
        filteredNews.map((news: NewsItem, index: number) => (
          <SingleNews key={index} title={news.title} content={news.content} image={news.image} source={news.source} timestamp={news.timestamp} url={news.url}  />
        ))
      ) : (
        (guardianApiLoading || nytApiLoading || newsApiLoading) ? (<Spin />) : (
          <div className="nothing">
            <p>No news found</p>
          </div>
        )
        )}
    {modal.type === 'news' && (
      <CustomModal
        extraClass='newsDetails-modal'
        footerModal={
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <a href={selectedNews.url} className='customButton general sourceLink' target='_blank'>Read from source</a>
          </div>
        }
      >
        <NewsDetails />
      </CustomModal>
    )}
    </section>
  )
}

export default NewsContainer