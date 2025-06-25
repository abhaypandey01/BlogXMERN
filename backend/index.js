import express from "express";
import 'dotenv/config';
import cors from "cors";
import connectDb from "./src/lib/connectDb.js";
import adminRoute from "./src/routes/admin.routes.js";
import blogRoutes from "./src/routes/blog.routes.js";

const app = express();

await connectDb();


app.use(cors({origin: ["http://localhost:5173","https://blogx-by-abhay.vercel.app"]})); // enable CORS with config
app.use(express.json()); // parse JSON bodies

//routes
app.use('/api/admin', adminRoute);
app.use('/api/blog', blogRoutes);

app.get('/', (req, res)=>{
    res.send('API IS RUNNING');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT);
})