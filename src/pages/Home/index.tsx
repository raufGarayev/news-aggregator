import Navbar from '../../components/Navbar'
import NewsContainer from '../../components/NewsContainer'
import './home.sass'

const Home = () => {
  return (
    <div className='home'>
        <Navbar />
        <NewsContainer />
    </div>
  )
}

export default Home