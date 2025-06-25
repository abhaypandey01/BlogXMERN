import { useNavigate } from "react-router-dom";


const BlogCard = ({blog}) => {

    const { _id, title, description, category, image } = blog;
    const navigate = useNavigate();

    return (
        <div onClick={()=>navigate(`/blog/${_id}`)} className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer">
            <img src={image} alt={_id} className="aspect-video" />
            <span className="ml-5 mt-4 inline-block px-4 py-1.5 bg-purple-500/20 text-purple-500 rounded-full text-xs">{category}</span>
            <div className="p-5">
                <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
                <p className="mb-3 text-xs text-gray-600" dangerouslySetInnerHTML={{__html: description.slice(0, 80)}}></p>
            </div>
        </div>
    )
}

export default BlogCard;