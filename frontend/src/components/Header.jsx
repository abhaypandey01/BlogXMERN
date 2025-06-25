import { FaStar, FaTrash } from "react-icons/fa"
import { useAppContext } from "../../context/AppContext"
import { useRef } from "react";

const Header = () => {

    const {setInput, input} = useAppContext();
    const inputRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        setInput(inputRef.current.value);
    }


    return (
        <div className='mx-8 sm:mx-16 xl:mx-24'>
            <div className="text-center mt-20 mb-8">
                <div className="inline-flex justify-center mb-4 px-4 py-1.5 gap-4 border-purple-500/40 bg-purple-500/20 rounded-full text-xs">
                    <p>New: AI featured included.</p><FaStar className="icon py-1.5 text-purple-700" size={20}/> 
                </div>
                <h1 className="text-3xl sm:text-6xl font-semibold text-gray-700 sm:leading-16">Your own <span className="text-purple-500">blogging</span> <br/>platoform.</h1>

                <p className="my-8 sm:my-16 mx-auto max-w-2xl max-sm:text-xs text-gray-500">ajje sdvh hfuf fh fhdnvhf nfuhghf v fdvhnnhf hv nvhfe8v hifhficv.</p>

                <form onSubmit={submitHandler} className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-200 bg-white rounded overflow-hidden">
                    <input ref={inputRef} type="text" placeholder="Search blog" required className="pl-4 w-full outline-none"/>
                    <button className="bg-purple-500 text-white px-6 py-2 m-1.5 hover:scale-105 transition-all rounded cursor-pointer">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Header