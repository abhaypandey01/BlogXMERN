import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppContext } from '../../../context/AppContext';

const Login = () => {

    const { navigate, axios, setToken } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/admin/login', {email, password});
            if (data.success) {
                setToken(data.token);
                toast.success("Logged in successfully.")
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = data.token;
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='flex flex-col items-start p-2 m-2 w-sm mb-4 border border-purple-500/40 shadow-md shadow-purple-500/50 rounded'>
                <div className='py-2 my-4 w-full text-center'>
                    <h2 className='mb-4 py-2 text-2xl sm:text-3xl text-gray-700 font-semibold'>Login</h2>
                    <p className='py-2 text-gray-400 text-lg font-bold'><span className='text-purple-500'>Admin</span> Login</p>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full px-4 sm:px-6 mb-8 text-gray-500'>
                    <div className='flex flex-col items-start w-full px-2 py-4 mb-4'>
                        <label className='text-lg font-semibold'>Email</label>
                        <input type="text" placeholder='Email' required
                        onChange={(e)=>setEmail(e.target.value)} value={email}
                        className='border-b-2 border-gray-500 py-2 px-4 outline-none'
                        />
                    </div>

                    <div className='flex flex-col items-start w-full px-2 py-4 mb-4'>
                        <label className='text-lg font-semibold'>Password</label>
                        <input type="password" placeholder='Password' required
                        onChange={(e)=>setPassword(e.target.value)} value={password}
                        className='border-b-2 border-gray-500 py-2 px-4 outline-none'
                        />
                    </div>

                    <button type='submit'
                    className='px-2 py-4 mb-4 w-full rounded-md bg-purple-500 text-white hover:scale-102 hover:bg-purple-500/70 transition font-semibold'
                    >Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login