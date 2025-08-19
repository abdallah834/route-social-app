import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreatePost from "../../components/posts/CreatePost";
import PostCard from "../../components/posts/PostCard";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

export default function UserProfile() {
  // use query is used to cache data from an api for better user experience
  // if the value is an array the initial value should be an []
  const { data: postsData, isLoading } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["user-posts"],
    // gcTime sets a declared time to remove cached data from the device's memory
    // staleTime sets a declared time to refetch the data from the queryFn API if there are any new posts made
    gcTime: 90000,
    select: (data) => data.posts,
  });

  async function getAllPosts() {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/users/${localStorage.getItem(
          "userID"
        )}/posts?limit=40`,
        {
          method: "GET",
          headers: { token: localStorage.getItem("token") },
        }
      );
      return data;
    } catch (error) {
      toast.error("Failed to load posts");
      return error;
    }
  }

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  return (
    <>
      <div className="text-black mx-auto max-w-[52rem]">
        <CreatePost />
        {isLoading ? (
          <Skeleton baseColor="#ddd" className="h-96 my-2" count={3} />
        ) : (
          postsData?.map((post) => <PostCard key={post?.id} postData={post} />)
        )}
      </div>
    </>
  );
}
