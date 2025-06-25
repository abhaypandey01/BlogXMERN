import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const CommentList = ({ comment, fetchComment }) => {

    const {blog, createdAt} = comment;
    const BlogDate = new Date(createdAt);
    const {axios} = useAppContext();

    const approveComment = async () => {
        try {
            const {data} = await axios.post('/api/admin/approve-comment', {id: comment._id});
            if(data.success){
                toast.success(data.message);
                await fetchComment();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const deleteComment = async () => {
        try {
            const {data} = await axios.post('/api/admin/delete-comment', {id: comment._id});
            if(data.success){
                toast.success(data.message);
                await fetchComment();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            <td className='px-6 py-2'>
                <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
                <br/>
                <br/>
                <b className='font-medium text-gray-600'>Name</b> : {comment.name}
                <br/>
                <br/>
                <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
            </td>
            <td className='px-6 py-2 max-sm:hidden'>{BlogDate.toLocaleDateString()}</td>
            <td className='px-6 py-2'>
                <div className='inline-flex items-center gap-4'>
                    {!comment.isApproved ? <FaCheckCircle className='hover:scale-110' onClick={approveComment}/> : <p className='px-4 py-1 bg-green-100 border-green-600 text-green-500 rounded-full'>Approved</p>}
                    <FaTrash onClick={deleteComment}/>
                </div>
            </td>
        </tr>
    )
}

export default CommentList;