import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreatePost from "../../components/posts/CreatePost";
import PostCard from "../../components/posts/PostCard";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import AppBtn from "../../components/Shared/AppBtn";
import { useState } from "react";

export default function Posts() {
  const [page, setPage] = useState(1);
  // use query is used to cache data from an api for better user experience
  //https://linked-posts.routemisr.com/posts?
  // if the value is an array the initial value should be an []
  const { data: postsData, isLoading } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["posts", page],
    // gcTime sets a declared time to remove cached data from the device's memory
    // staleTime sets a declared time to refetch the data from the queryFn API if there are any new posts made
    gcTime: 90000,
    select: (data) => data.posts,
  });
  // const [allPosts, setAllPost] = useState([]);

  async function getAllPosts() {
    try {
      const { data } = await axios(
        `${
          import.meta.env.VITE_BASE_URL
        }/posts?limit=30&sort=-createdAt&page=${page}`,
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
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    setPage((prev) => prev - 1);
  };
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
        <div className="flex items-center justify-between mt-5 mb-4">
          <div>
            <AppBtn onClick={handlePreviousPage}>Previous</AppBtn>
          </div>
          <div>
            <AppBtn onClick={handleNextPage}>Next</AppBtn>
          </div>
        </div>
      </div>
    </>
  );
}
