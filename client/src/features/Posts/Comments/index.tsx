import { FC } from "react";
import { Comment as IComment } from "../../../@types/Comment";
import Comment from "./Comment";

const Comments: FC<{ comments: IComment[] }> = ({ comments }) => {
  return (
    <div>
      {comments?.length &&
        comments.map((comment) => (
          <Comment {...comment} key={comment.commentId} />
        ))}
    </div>
  );
};

export default Comments;
