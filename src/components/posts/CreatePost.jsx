import { Icon } from "@iconify/react";
import { useContext, useRef } from "react";
import { Link } from "react-router";
import { userContext } from "../../context/Context";
import AppBtn from "../Shared/AppBtn";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//
//
export default function CreatePost() {
  // useMutation is commonly used with (post-put-delete-patch) otherwise useQuery is used instead.
  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: createPost,
  });
  const { userData } = useContext(userContext);
  // using useQueryClient() to invalidate the queryKey of ["posts"] in order to get latest data after creating a post
  const queryClient = useQueryClient();
  // watch rerenders the component when changes occur
  const { register, handleSubmit, watch, setValue, reset } = useForm();

  async function createPost(values) {
    const setFormData = new FormData();

    try {
      // sending created post data to the posts db
      if (
        values.body !== "" ||
        values.body !== " " ||
        values.body !== undefined
      ) {
        setFormData.append("body", values.body);

        uploadInput.current.files[0]
          ? setFormData.append("image", uploadInput.current.files[0])
          : null;

        await axios(`${import.meta.env.VITE_BASE_URL}/posts`, {
          method: "POST",
          data: setFormData,
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success("Post created");
        reset();
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      toast.error("Failed to create post");
      console.error(error);
    }
  }
  // to select a jsx element
  const uploadInput = useRef();
  // ------------------------- mutation --------------------------
  // const mutationTest = () => {
  //   console.log("hello");
  // };
  // const {
  //   mutate,
  //   data: mutationData,
  //   isPending,
  // } = useMutation({
  //   mutationFn: mutationTest,
  //   onSuccess: (data) => console.log(data),
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });
  return (
    <>
      <form
        onSubmit={handleSubmit(createPostMutation)}
        className="bg-white rounded-xl my-5 py-2"
      >
        {/****************** card header *****************/}
        <span className="border-b border-gray-400/50 block mb-8 pb-4">
          <span className="ms-3 font-bold">Post something</span>
        </span>
        {/****************** card body *****************/}
        <div className="flex flex-row gap-5 items-center mx-5">
          <Link to={"/"}>
            <img
              src={`${userData?.photo}`}
              alt="user's avatar"
              className="w-[40px] h-[38px] rounded-[50%] me-3"
            />
          </Link>
          <input
            {...register("body")}
            id="post-field"
            type="text"
            placeholder="Post"
            className="dark:bg-gray-300/65 grow outline-0 focus:outline-1 border-1 py-2 rounded-xl placeholder:ps-2"
          />
          <input
            {...register("image")}
            ref={uploadInput}
            type="file"
            className="hidden"
            onChange={(e) => setValue("image", e.target.files)}
          />
          <Icon
            icon="fa:file-picture-o"
            className="text-[#222] opacity-40 text-3xl cursor-pointer"
            onClick={() => uploadInput.current.click()}
          />
        </div>
        <div>
          {watch("image") && (
            <img
              /////////////////////////// to create a URL out of an uplaoded file
              src={URL.createObjectURL(uploadInput?.current?.files[0])}
              alt="post's image"
              className="rounded-xl block mx-auto mb-4"
            />
          )}
        </div>
        <div className="my-5 mt-7 mx-5">
          <AppBtn isLoading={isPending} type="submit" className={"w-full"}>
            <span className="font-semibold text-white tracking-wider">
              Create post
            </span>
          </AppBtn>
        </div>
      </form>
    </>
  );
}
