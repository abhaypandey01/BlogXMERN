import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: { type: String, required: true },
    subTitle: { type: String, default: '' },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: false},

}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;