import { Card } from "flowbite-react";
import { Link, useParams } from "react-router";
import AnimatedContent from "../aimation/AnimatedContent";
import PostComment from "./PostComment";
import { Icon } from "@iconify/react";
import CreateComment from "./CreateComment";
import { useContext } from "react";
import { userContext } from "../../context/Context";

export default function PostCard({ postData }) {
  // postData?.user?.photo
  // postData?.user?.name
  // postData?.createdAt
  // postData?.body
  // postData?.image
  const { id } = useParams();
  // using relativeTime function from context
  const { formatRelativeTime } = useContext(userContext);
  // formatting time based on seconds,minutes,hours ago and yesterday

  // time ago
  const relativeFormattedTime = formatRelativeTime(
    new Date(postData?.createdAt)
  );

  // normal formatted time
  const formattedTime = new Date(postData?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
    }
  );
  return (
    <Card className="dark:bg-white my-4 text-black">
      {/* card header */}
      <div className="flex items-center">
        <Link to={"/"}>
          <img
            src={`${postData?.user?.photo}`}
            alt="user's avatar"
            className="w-[40px] h-[38px] rounded-[50%] me-3"
          />
        </Link>
        <div>
          <span className="font-bold block text-black">{`${postData?.user?.name}`}</span>
          <span className="text-gray-600/70 font-bold text-sm">{`${
            relativeFormattedTime === "2 days ago"
              ? formattedTime
              : relativeFormattedTime
          }`}</span>
        </div>
      </div>
      {/* card content */}
      <div>
        <span className="mb-4 block text-black">{`${
          postData?.body ? postData?.body : ""
        }`}</span>
        {postData?.image ? (
          <div className="w-full flex flex-row justify-center">
            <img
              src={`${postData?.image}`}
              alt="post image"
              className="rounded-xl"
            />
          </div>
        ) : null}
        {id ? null : (
          <span className="flex justify-end">
            <Link
              to={"/posts/" + postData?.id}
              className="text-end underline text-cyan-500 p-2 font-medium"
            >
              see post details
            </Link>
          </span>
        )}
      </div>
      {/* card comment */}
      <div className="flex items-center gap-1.5">
        <Icon
          icon="mingcute:comment-fill"
          className="size-8 text-gray-500
        "
        />
        <span>{`${postData?.comments?.length} Comment${
          postData?.comments?.length > 1 ? `s` : ``
        }`}</span>
      </div>

      {postData?.comments?.length ? (
        id ? (
          postData.comments.map((c) => (
            <PostComment
              key={c?._id}
              comment={c}
              postCreatorId={postData?.user?._id}
            />
          ))
        ) : (
          <PostComment
            comment={postData.comments[postData.comments.length - 1]}
            postCreatorId={postData?.user?._id}
          />
        )
      ) : null}

      <div>
        <CreateComment postId={postData?.id} />
      </div>
    </Card>
  );
}
