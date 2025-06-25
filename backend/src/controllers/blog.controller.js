import fs from "fs";
import imagekit from "../lib/imageKit.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import main from "../lib/gemini.js";

//add blog
export const addBlog = async(req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;
    
        if(!title || !description || !category){
            return res.json({success: false, message: "Required fields missing."})
        }
    
        //creating file buffer
        const fileBuffer = fs.readFileSync(imageFile.path);
        //uploading image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });
    
        //optimizng imagekit url
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //auto compression
                {format: 'webp'}, //convert into modern format
                {width: '1280'} //width resizing
            ]
        });

        const image = optimizedImageUrl;
        await Blog.create({
            title, subTitle, description, category, image, isPublished
        })

        return res.json({success:true, message: 'Blog created successfully.'})
    } catch (error) {
            return res.json({success: false, message: error.message})
        
    }

}

//get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        return res.json({ success: true, blogs });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//get blog by id
export const getBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        return res.json({ success: true, blog });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//admin delete blog
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ success: false, message: "Blog id missing" });
        }

        await Blog.findByIdAndDelete(id);

        await Comment.deleteMany({blog: id});

        return res.json({ success: true, message: "Blog deleted successfully." });
    } catch (error) {
        console.log("error in admin controller");
        return res.json({ success: false, message: error.message });
    }
}

//toggle isPublished
export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ success: false, message: "Blog id missing" });
        }

        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();

        return res.json({ success: true, message: "Blog status updated." });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//add comment
export const addComment = async (req, res) => {
    const { blog, name, content } = req.body;
    if (!blog || !name || !content) {
        return res.json({ success: false, message: "Fields missing" });
    }

    try {
        await Comment.create({ blog, name, content });
        

        return res.json({ success: true, message: "Comment submitted for review." });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//get comments on a blog
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        if (!blogId) {
            return res.json({ success: false, message: "blog id missing" })
        }

        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({createdAt: -1});

        return res.json({ success: true, comments })

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//genrate ai content
export const generateContent = async (req, res) => {
    try {
        const {prompt} = req.body;
        if(!prompt){
            return res.json({success: false, message: "Prompt not given"});
        }
        const content = await main(prompt + "Generate blog content for this topic in simple text format");

        return res.json({success: true, content});
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}