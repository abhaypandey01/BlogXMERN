import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Moment from "moment";
import { FaUser } from "react-icons/fa";
import Footer from "../components/Footer";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {

  const {axios} = useAppContext();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [comment, setComment] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');


  const fetchData = async () => {
    try {
      const {data} = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComment = async () => {
    try {
      const {data} = await axios.post('/api/blog/comments', {blogId: id});
      if(data.success){
        setComment(data.comments)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if(data.success){
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchData()
    fetchComment()
  });

  return data ? (
    <div className="">
      <Navbar />

      {/* title and subtitle */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-purple-500 py-4 font-medium">Published On {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">{data.title}</h1>
        <p className="my-5 max-w-lg truncate mx-auto">{data.subtitle}</p>
      </div>

      {/* //blog description */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt={data.id} />

        <div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: data.description }}></div>
      </div>

      {/* // comments */}
      <div className="mb-10 mt-14 max-w-3xl mx-auto">
        <p>Comments ({comment.length})</p>
        <div className="flex flex-col gap-4">
          {comment.map((item, index) => (
            <div className="relative bg-purple-500/2 border border-purple-500/5 max-w-xl p-4 rounded text-gray-600"
              key={index}>
              <div className="flex items-center mb-2 gap-2">
                <FaUser />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{item.content}</p>
              <div className="flex items-center bottom-3 right-4 absolute gap-2 text-xs">{Moment(item.createdAt).fromNow()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* add comment section */}
      <div className="max-w-3xl mx-auto">
        <p className="mb-4 font-semibold">Add your comments!</p>
        <form onSubmit={addComment} className="max-w-lg flex flex-col items-start gap-4">
          <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <textarea className="w-full p-2 h-42 border border-gray-300 outline-none rounded"
            placeholder="Comment" required value={content} onChange={e => setContent(e.target.value)}></textarea>
          <button type="submit" className="p-2 px-6 bg-purple-500 hover:scale-102 text-white transition-all cursor-pointer rounded">Submit</button>
        </form>
      </div>

      {/* /// social media icons */}


      <Footer />

    </div>
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-8 h-8 text-purple-600" />
    </div>
  )
}

export default Blog;