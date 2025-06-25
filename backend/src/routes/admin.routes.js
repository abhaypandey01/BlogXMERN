import {Router} from "express";
import { 
    adminLogin, 
    allAdminBlogs,
    approveComment,
    deleteCommentById,
    getAllComments,
    getDashboard,

} from "../controllers/admin.controller.js";

const adminRoute = Router();

adminRoute
    .post('/login', adminLogin)
    .get('/blogs', allAdminBlogs)
    .get('/comments', getAllComments)
    .get('/dashboard', getDashboard)
    .post('/delete-comment', deleteCommentById)
    .post('/approve-comment', approveComment)


export default adminRoute;