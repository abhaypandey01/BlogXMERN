import { useEffect, useState } from 'react'
import { FaComments, FaFile, FaFileAlt, FaRegFileAlt } from 'react-icons/fa';
import BlogListTable from '../../components/admin/BlogListTable';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const { axios } = useAppContext();

  const fetchDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/admin/dashboard');
      if(data.success){
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  })

  return (
    <div className='flex-1 p-4 md:p-10 bg-purple-50/50'>

      <div className='flex flex-wrap gap-4'>

        <div className='flex items-center gap-4 min-w-58 p-4 bg-white rounded shadow hover:scale-105 transition-all'>
          <FaFileAlt />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 min-w-58 p-4 bg-white rounded shadow hover:scale-105 transition-all'>
          <FaComments />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 min-w-58 p-4 bg-white rounded shadow hover:scale-105 transition-all'>
          <FaRegFileAlt />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <FaFile />
          <p>Latest Blogs</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow scrollbar-hide bg-white rounded-lg'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-sx text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4'>#</th>
                <th scope='col' className='px-2 py-4'>Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogListTable key={blog} blog={blog} fetchBlog={fetchDashboardData} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard;