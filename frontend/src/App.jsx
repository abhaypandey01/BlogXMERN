import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Blog from "./page/Blog";
import Layout from "./page/admin/Layout";
import Login from "./components/admin/Login";
import Comments from "./page/admin/Comments";
import BlogsList from "./page/admin/BlogsList";
import AddBlog from "./page/admin/AddBlog";
import Dashboard from "./page/admin/Dashboard";
import 'quill/dist/quill.snow.css';
import { Toaster } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const App = () => {

  const {token} = useAppContext();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        {/* <Route path="" element={}/> */}
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="blogsList" element={<BlogsList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;