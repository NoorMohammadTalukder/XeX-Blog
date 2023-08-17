
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AllBlogs from "./pages/AllBlogs/AllBlogs";
import Login from "./pages/Login/Login";
import UserAllBlogs from "./pages/User/UserAllBlogs";
import BlogsDetails from "./pages/BlogsDetails/BlogsDetails";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";
import Registration from "./pages/Registration/Registration";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import "./index.css"

const App = () => {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route element={<AllBlogs/>} path="/"/>
                  <Route element={<Login/>} path="/login"/>
                  <Route element={<Registration/>} path="/registration"/>
                  <Route element={<CreateBlog/>} path="/create-blog"/>
                  <Route element={<UserAllBlogs/>} path="/user-all-blogs"/>
                  <Route element={<BlogsDetails/>} path="/blogs-details/:id"/>
                  <Route element={<UpdateBlog/>} path="/blogs-update/:id"/>
                  <Route path="*" element={<AllBlogs />} />
                  {/* <Route element={<Create/>} path="/create"/>
                  <Route element={<Update/>} path="/update/:id"/> */}
              </Routes>
          </BrowserRouter>
          
      </div>
  );
};

export default App;
