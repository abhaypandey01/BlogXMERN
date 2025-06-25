import { useState } from "react";
import { categories } from "../../data";
import BlogCard from "./BlogCard";
import { useAppContext } from "../../context/AppContext";


const BlogList = () => {

  const [menu, setMenu] = useState('All');
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if(input === '') return blogs;
    return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()) );
  }

  return (
    <div className="">
      <div className="flex justify-center my-10 gap-4 sm:gap-8">
        {categories.map((item) => (
          <div key={item} className="">
            <button onClick={() => setMenu(item)} className={`text-gray-500 px-6 py-2 mx-6 sm:mx-8 cursor-pointer ${menu === item && 'text-white bg-purple-500 hover:scale-105 transition-all duration-300 rounded-full'}`}>
              {item}
            </button>
          </div>
        ))}
      </div>

      {/* blog component goes here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs().filter((blog) => (menu === "All" ? true : blog.category === menu)).map((blog) => (
          <BlogCard key={blog} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList;