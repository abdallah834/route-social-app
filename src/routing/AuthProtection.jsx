import { Navigate } from "react-router";

export default function AuthProtection({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
