import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import PostCard from "../../components/posts/PostCard";
import Skeleton from "react-loading-skeleton";

export default function PostDetails() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: getPostData,
    queryKey: ["post-details", id],
  });
  // const [postDetails, setPostDetails] = useState();
  async function getPostData() {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`,
        {
          method: "GET",
          headers: { token: localStorage.getItem("token") },
        }
      );
      return data?.post;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // useEffect(() => {
  //   getPostData();
  // }, []);

  return (
    <>
      <div className="mx-auto max-w-[52rem]">
        {isLoading ? (
          <Skeleton baseColor="#ddd" className="h-96 my-2" count={1} />
        ) : (
          <PostCard postData={data} />
        )}
      </div>
    </>
  );
}
