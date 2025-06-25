import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";


const BlogListTable = ({ blog, fetchBlog, index }) => {

    // const { title, createdAt } = blog;
    const BlogDate = new Date(blog.createdAt);
    const{axios} = useAppContext();

    const deleteBlog = async() => {
        const confirm = window.confirm("Are you sure you want to delete Blog?");
        if(!confirm) return;
        try {
            const {data} = await axios.post('/api/blog/delete', {id: blog._id});
            if (data.success) {
                toast.success(data.message);
                await fetchBlog();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const togglePublish = async()=>{
        try {
            const {data} = await axios.patch('/api/blog/toggle-publish', {id: blog._id});
            if (data.success) {
                toast.success(data.message);
                await fetchBlog();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <tr className="border-y border-gray-400">
            <td className="px-2 py-4 ">{index}</td>
            <td className="px-2 py-4 ">{blog.title}</td>
            <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
            <td className="px-2 py-4 max-sm:hidden">
                <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>{blog.isPublished ? "Published" : "Unpublished"}</p>
            </td>
            <td className="px-2 py-4 flex text-xs gap-3">
                <button className="px-2 py-0.5 rounded mt-1 cursor-pointer" onClick={togglePublish}>{blog.isPublished ? "Unpublish" : "Publish"}</button>
                <FaTrash onClick={deleteBlog}/>
            </td>
        </tr>
    )
}

export default BlogListTable;