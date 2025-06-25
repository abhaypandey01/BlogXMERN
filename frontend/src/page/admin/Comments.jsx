import React, { useEffect, useState } from 'react'
import CommentList from '../../components/admin/CommentList';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {

  const [commentData, setCommentData] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const {axios} = useAppContext();

  const fetchComments = async () => {
    try {
      const {data} = await axios.get('/api/admin/comments');
      if(data.success){
        setCommentData(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchComments();
  })

  return (
    <div className='flex-1 pt-5 px-5 sm:pl-16 sm:pt-12 bg-purple-50/50'>

      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button onClick={()=>setFilter('Approved')} 
          className={`text-xs px-4 py-2 rounded-full cursor-pointer ${filter === 'Approved' ? 'text-green-600 border border-green-800' : 'text-gray-600 border border-gray-700'}`}>Approved</button>
          <button onClick={()=>setFilter('Not Approved')}
          className={`text-xs px-4 py-2 rounded-full cursor-pointer ${filter === 'Not Approved' ? 'text-orange-700 border border-orange-800' : 'text-gray-600 border border-gray-700'}`}>Not Approved</button>
        </div>
      </div>

      <div className='relative max-w-3xl overflow-x-auto scrollbar-hide mt-5 bg-white rounded-lg shadow'>
        <table className='text-xs text-gray-600 w-full'>
          <thead className='text-sm text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-2'>Blog Title & Comment</th>
              <th scope='col' className='px-6 py-2 max-sm:hidden'>Date</th>
              <th scope='col' className='px-6 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              commentData.filter((comment)=>{
                if(filter === 'Approved') return comment.isApproved === true;
                return comment.isApproved === false;
              }).map((comment)=>(
                <CommentList comment={comment} key={comment} fetchComment={fetchComments} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments;