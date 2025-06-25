
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='flex flex-col w-full min-h-screen bg-white'>
      <Navbar />
      <Header />
      <BlogList />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home;