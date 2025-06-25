import { Outlet } from "react-router-dom"
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../../context/AppContext";


const Layout = () => {

  const { navigate, axios, setToken } = useAppContext();

  const logout = async () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
  }

  return (
    <>
      <div className='flex justify-between items-center h-[70px]'>
        <div className='avatar py-2 px-2' onClick={() => navigate('/')}>
          <div className=" flex justify-center items-center w-8 h-8 rounded-full bg-slate-500 text-gray-50">
            B
          </div>
        </div>
        <button className="py-1 px-6 mx-10 sm:mx-18 rounded bg-purple-500 text-white text-md" onClick={logout}>Logout</button>
      </div>
      <div className="flex h-[100vh-70px]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout;