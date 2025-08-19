import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/login/Login.jsx";
import Register from "../pages/auth/register/Register";
import Layout from "../components/Layout/Layout";
import Posts from "../pages/Posts/Posts";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import AuthProtection from "./AuthProtection.jsx";
import PostDetails from "../pages/postDetails/PostDetails.jsx";
import UserProfile from "../pages/userProfile/UserProfile.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
      { path: "/posts/:id", element: <PostDetails /> },
      {
        path: "login",
        element: (
          <AuthProtection>
            <Login />
          </AuthProtection>
        ),

        children: [{}],
      },
      {
        path: "register",
        element: (
          <AuthProtection>
            <Register />
          </AuthProtection>
        ),

        children: [{}],
      },
      { path: "user-profile", element: <UserProfile /> },
    ],
  },
]);
