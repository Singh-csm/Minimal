import Login from "./pages/Login/Login";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import Createpost from "./pages/createpost/Createpost";

import UsersPost from "./component/UsersPost";
import Navbar from "./component/Navbar";
import Edit from "./pages/editpost/Edit";
const CheckLogin = (children) => {
  const navigate = useNavigate();
  useEffect(() => {
    let user = localStorage.getItem("user");
    // let token = Cookies.get("newToken");
    // console.log(token);
    if (!user) {
      return navigate("/login");
    }
  }, []);

  return children.children;
};

function App() {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/create"
            element={
              <CheckLogin>
                <Createpost />
              </CheckLogin>
            }
          />
          <Route
            path="/posts"
            element={
              <CheckLogin>
                <UsersPost />
              </CheckLogin>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <CheckLogin>
                <Edit />
              </CheckLogin>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
