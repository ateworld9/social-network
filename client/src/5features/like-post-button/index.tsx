import { Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { useAppDispatch } from "@shared/hooks";

import { fetchLike } from "./thunk";

const LikePostButton = ({
  postId,
  liked,
  likesCount,
  className,
}: LikePostButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      className={className}
      variant="text"
      color={liked ? "secondary" : "primary"}
      startIcon={
        liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />
      }
      onClick={() => {
        dispatch(fetchLike(postId));
      }}
    >
      <span>{likesCount} Likes</span>
    </Button>
  );
};
export { LikePostButton };
