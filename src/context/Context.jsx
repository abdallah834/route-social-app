// to share a value between components without props drilling or lifting state up
import { createContext, useState } from "react";
import axios from "axios";

export const userContext = createContext();
export default function ContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  function formatRelativeTime(date, locale = "en-US") {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, "second");
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
    } else if (diffInSeconds < 604800) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
    } else if (diffInSeconds < 2419200) {
      return rtf.format(-Math.floor(diffInSeconds / 604800), "week");
    } else if (diffInSeconds < 29030400) {
      return rtf.format(-Math.floor(diffInSeconds / 2419200), "month");
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 29030400), "year");
    }
  }
  async function getUserData(token) {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
        {
          method: "GET",
          headers: { token: token },
        }
      );

      setUserData(data?.user);
      localStorage.setItem("userID", data?.user?._id);
    } catch (error) {
      console.error(error);
    }
  }
  const data = { userData, setUserData, getUserData, formatRelativeTime };

  return (
    <>
      <userContext.Provider value={data}>{children}</userContext.Provider>
    </>
  );
}
