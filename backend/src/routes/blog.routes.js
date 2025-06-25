import { Router } from "express";
import {
    addBlog,
    addComment,
    deleteBlog,
    generateContent,
    getAllBlogs,
    getBlog,
    getBlogComments,
    togglePublish,

} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/upload.js";
import auth from "../middlewares/auth.js";


const blogRoutes = Router();

blogRoutes
    .post('/add', upload.single('image'), auth, addBlog)
    .get('/all', getAllBlogs)
    .get('/:blogId', getBlog)
    .post('/delete',auth, deleteBlog)
    .patch('/toggle-publish', auth, togglePublish)
    .post('/add-comment', addComment)
    .post('/comments', getBlogComments)
    .post('/generate', generateContent)



export default blogRoutes;