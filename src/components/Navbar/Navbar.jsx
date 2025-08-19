import { Icon } from "@iconify/react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { userContext } from "../../context/Context";

//
//

export function NavbarFlowbite() {
  const { userData, getUserData, setUserData } = useContext(userContext);

  // getting the user data from an api using a token stored in local storage
  useEffect(() => {
    localStorage.getItem("token")
      ? getUserData(localStorage.getItem("token"))
      : null;
  }, []);

  return (
    <>
      <Navbar fluid rounded className="sm:px-20 dark:bg-gray-700 rounded-none">
        <NavbarBrand as={Link}>
          <Icon
            icon="cryptocurrency:aave"
            className="size-9 text-cyan-600 me-3 dark:text-cyan-400"
          />
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          {userData ? (
            <div className="user-info-container flex flex-row items-center py-3">
              <Link to={"/user-profile"}>
                <img
                  src={`${userData?.photo}`}
                  alt="user's avatar"
                  className="w-[40px] h-[38px] rounded-[50%] me-3"
                />
              </Link>

              <span className="text-black dark:text-white">
                <b className="text-[17px]">welcome </b>
                {`${userData?.name}`}
              </span>
              <Link
                className="ms-2 cursor-pointer"
                to={"/login"}
                onClick={() => {
                  localStorage.clear();
                  setUserData(null);
                }}
              >
                <Icon
                  icon="material-symbols:logout"
                  className="text-black size-8 dark:text-cyan-500"
                />
              </Link>
            </div>
          ) : (
            <NavLink to={"/login"} className={"text-black dark:text-white"}>
              <button className="bg-cyan-500 px-4 py-2 rounded-3xl cursor-pointer hover:bg-cyan-400 transition-all my-3">
                Login
              </button>
            </NavLink>
          )}
        </NavbarCollapse>
      </Navbar>
    </>
  );
}
