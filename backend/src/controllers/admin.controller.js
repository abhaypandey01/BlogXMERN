import jwt from "jsonwebtoken";
// import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import Blog from "../models/blog.model.js";


//admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Fields missing" })
        }

        if (email !== process.env.USER_MAIL || password !== process.env.USER_PASS) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = jwt.sign(process.env.USER_MAIL, process.env.JWT_SECRET);

        return res.json({ success: true, message: "Login successful", token })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}



//get all admin blogs
export const allAdminBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });

        return res.json({ success: true, blogs });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}



//get all comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });

        return res.json({ success: true, comments });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//dashboard
export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            recentBlogs, blogs, comments, drafts
        }

        return res.json({ success: true, dashboardData })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//delete comment by id
export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ success: false, message: "Id missing" });
        }

        await Comment.findByIdAndDelete(id);

        return res.json({ success: true, message: "Comment deleted successfully." });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//approve comment by id
export const approveComment =async(req, res) => {
    try {
        
        const { id } = req.body;
        if (!id) {
            return res.json({ success: false, message: "Id missing" });
        }

        await Comment.findByIdAndUpdate(id, {isApproved: true});

        return res.json({ success: true, message: "Comment approved successfully." });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}