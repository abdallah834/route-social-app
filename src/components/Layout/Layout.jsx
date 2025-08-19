import { Outlet } from "react-router";
import { NavbarFlowbite } from "../Navbar/Navbar";
import { Toaster } from "react-hot-toast";
export default function Layout() {
  return (
    <>
      <NavbarFlowbite />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="bg-gray-300 dark:bg-gray-800 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
