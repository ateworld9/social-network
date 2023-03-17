import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "@shared/hooks";
import { fetchDeletePost } from "./thunk";

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(fetchDeletePost(postId));
  };

  return (
    <Button color="error" startIcon={<DeleteIcon />} onClick={handleClick}>
      Delete
    </Button>
  );
};
export { DeletePostButton };
