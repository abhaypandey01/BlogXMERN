import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { categories } from '../../../data';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import { Loader2 } from 'lucide-react';

const AddBlog = () => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const blog = {
        title, subTitle,
        description: quillRef.current.root.innerHTML,
        category, isPublished
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData);
      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setSubtitle('');
        quillRef.current.root.innerHTML = '';
        setCategory('Startup');
        isPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false);
    }
  }

  const generateContent = async () => {
    if (!title) return;
    try {
      setIsAdding(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  }

  useEffect(() => {
    // initiate quill only once
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  })

  return (
    <form onSubmit={submitHandler} className='flex-1 bg-purple-50/50 text-gray-600 overflow-scroll h-full '>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? '/uploadFile.png' : URL.createObjectURL(image)} alt="upload" className='mt-2 h-16 rounded cursor-pointer' />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" id="image" hidden required />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Title' required className='w-full mt-2 p-2 border border-gray-500 rounded outline-none max-w-lg' value={title} onChange={(e) => setTitle(e.target.value)} />

        <p className='mt-4'>Subtitle</p>
        <input type="text" placeholder='Title' required className='w-full mt-2 p-2 border border-gray-500 rounded outline-none max-w-lg' value={subTitle} onChange={(e) => setSubtitle(e.target.value)} />

        <p className='mt-4'>Blog Description</p>
        <div className='relative max-w-lg h-74 pb-12 sm:pb-10 pt-2 '>
          <div ref={editorRef}></div>
          {isAdding && <Loader2 className='w-8 p-2 m-1 animate-spin'/>}
          <button type='button' disabled={isAdding} onClick={generateContent} className='absolute right-2 bottom-2 px-4 py-1.5
          rounded-full bg-black/70 text-white hover:underline cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none cursor-pointer'>
          <option value="" >Select Category</option>
          {categories.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>

        <div className='flex gap-4 mt-4'>
          <p>Publish now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)} />
        </div>

        <button disabled={isAdding} type='submit' className="py-1 px-6 mt-4 rounded bg-purple-500 text-white text-md">
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog;