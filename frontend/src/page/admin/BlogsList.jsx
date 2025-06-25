import { useEffect, useState } from "react";
import BlogListTable from "../../components/admin/BlogListTable";
import toast from "react-hot-toast";
import { useAppContext } from "../../../context/AppContext";


const BlogsList = () => {

  const [blogData, setBlogData] = useState([]);
  const {axios} = useAppContext();

  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get('/api/admin/blogs');
      data.success ? setBlogData(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchBlogs();
  })

  return (
    <div className="flex-1 mt-4 pt-5 px-5 sm:pl-16 sm:pt-12 bg-purple-50/50">
      <h1>All Blogs</h1>

      <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow scrollbar-hide bg-white rounded-lg'>
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
              {blogData.map((blog, index)=>(
                <BlogListTable key={blog} blog={blog} fetchBlog={fetchBlogs} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default BlogsList;