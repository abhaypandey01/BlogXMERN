import { FaComments, FaFileAlt, FaPlusCircle, FaTachometerAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col min-h-screen border-r border-gray-200 pt-6'>
      <NavLink end={true} to='/admin' className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-purple-500/10 border-r-4 border-purple-500'}`}>
        <FaTachometerAlt/>
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>

      <NavLink to='/admin/blogsList' className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-purple-500/10 border-r-4 border-purple-500'}`}>
        <FaFileAlt/>
        <p className='hidden md:inline-block'>Blogs List</p>
      </NavLink>

      <NavLink to='/admin/addBlog' className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-purple-500/10 border-r-4 border-purple-500'}`}>
        <FaPlusCircle/>
        <p className='hidden md:inline-block'>Add Blog</p>
      </NavLink>

      <NavLink to='/admin/comments' className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-purple-500/10 border-r-4 border-purple-500'}`}>
        <FaComments/>
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>
    </div>
  )
}

export default Sidebar;