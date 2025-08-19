import { useContext } from "react";
import { Link } from "react-router";
import { userContext } from "../../context/Context";
import AppBtn from "../Shared/AppBtn";
// import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Icon } from "@iconify/react/dist/iconify.js";
/////////////////
/////////////////

export default function CreateComment({ postId }) {
  // using useQueryClient to invalidate the "posts" query key to get the latest comment
  const queryClient = useQueryClient();
  // context---------------------
  const { userData } = useContext(userContext);
  // form handling-----------------
  const { register, handleSubmit, reset } = useForm();
  // Mutation---------------------
  // passing the mutate value to the handleSubmit form to initiate async function call of the handleCreateComment().
  // mutate sends the object {content} of values to the handleCreateComment() by default.
  // u can destruct data from the useMutation object to see the promise from the mutationFn.
  // onSuccess = try{}
  // onError = catch{}
  // useMutation is basically used instead of hard coding the API call proccess.
  const {
    mutate,
    isPending,
    // data: commentData,
  } = useMutation({
    mutationFn: handleCreateComment,
    onSuccess: () => {
      toast.success("Comment created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts-details"] });
      reset();
    },
    onError: () => {
      toast.error("Failed to comment");
    },
  });

  async function handleCreateComment({ content }) {
    // to recive the destructured data from useMutation hook we need to return the response data from the axios API call
    const commentData = { content, post: postId };
    const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/comments`, {
      method: "POST",
      data: commentData,
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(mutate)}
        className="bg-zinc-200/90 rounded-xl mt-8 p-5"
      >
        {/****************** card body *****************/}
        <div className="flex flex-row gap-2 items-center">
          <Link to={"/"}>
            <img
              src={`${userData?.photo}`}
              alt="user's avatar"
              className="w-[40px] h-[38px] rounded-[50%] me-3"
            />
          </Link>
          <input
            {...register("content")}
            id="post-field"
            type="text"
            placeholder="Comment"
            className="text-black dark:bg-gray-300/65 grow outline-0 focus:outline-1 border-1 py-2 rounded-xl placeholder:ps-2"
          />
          <div>
            <AppBtn isLoading={isPending} type="submit">
              {isPending ? null : (
                <Icon
                  icon="fa:send"
                  width="20"
                  height="20"
                  className="color: #9d9d9d"
                />
              )}
            </AppBtn>
          </div>
        </div>
        {/* <div>
          {watch("image") && (
            <img
              /////////////////////////// to create a URL out of an uplaoded file
              src={URL.createObjectURL(uploadInput?.current?.files[0])}
              alt="post's image"
              className="rounded-xl block mx-auto mb-4"
            />
          )}
        </div> */}
      </form>
    </>
  );
}
