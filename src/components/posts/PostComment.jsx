import { Link } from "react-router";
import AppBtn from "../Shared/AppBtn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../../context/Context";

export default function PostComment({ comment, postCreatorId }) {
  const queryClient = useQueryClient();
  const { mutate: removeCommentMutation, isPending } = useMutation({
    mutationFn: handleDeleteComment,
    onSuccess: () => {
      toast.success("Comment deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts-details"] });
    },
    onError: () => {
      toast.error("Failed to delete");
    },
  });
  async function handleDeleteComment() {
    await axios(`${import.meta.env.VITE_BASE_URL}/comments/${comment?._id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    });
  }
  const { formatRelativeTime } = useContext(userContext);
  // time ago
  const relativeFormattedTime = formatRelativeTime(
    new Date(comment?.createdAt)
  );

  // normal formatted time
  const formattedTime = new Date(comment?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
    }
  );
  return (
    <div className="rounded-2xl bg-zinc-200 p-4 mt-2">
      <div className="flex items-center">
        <Link to={"/"}>
          <img
            src={`${
              comment?.commentCreator?.photo.includes("undefined")
                ? `https://linked-posts.routemisr.com/uploads/default-profile.png`
                : comment?.commentCreator?.photo
            }`}
            alt="user's avatar"
            className="w-[40px] h-[38px] rounded-[50%] me-3"
          />
        </Link>
        <div>
          <span className="font-bold block text-black">{`${comment?.commentCreator?.name}`}</span>
          <span className="text-black/40 text-sm font-bold">{`${
            relativeFormattedTime === "2 days ago"
              ? formattedTime
              : relativeFormattedTime
          }`}</span>
        </div>
      </div>
      <div className="commnent-content-container flex justify-between">
        <span className="block ms-2 mt-2 text-gray-600">
          {comment?.content}
        </span>
        {postCreatorId === localStorage.getItem("userID") && (
          <AppBtn
            isLoading={isPending}
            className={"w-fit p-3"}
            onClick={removeCommentMutation}
          >
            <Icon icon="wpf:delete" className="size-5" />
          </AppBtn>
        )}
      </div>
    </div>
  );
}
