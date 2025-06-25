
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {

    const {navigate, token} = useAppContext();

    return (
        <div className='flex justify-between items-center'>
            <div className='avatar py-2 px-2' onClick={()=>navigate('/')}>
                <div className=" flex justify-center items-center w-8 h-8 rounded-full bg-slate-500 text-gray-50">
                    B
                </div>
            </div>
            <button className="py-1 px-6 mx-10 sm:mx-18 rounded bg-purple-500 text-white text-md" onClick={()=>navigate('/admin')}>{token ? 'Dashboard' : 'Login'}</button>
        </div>
    )
}

export default Navbar;