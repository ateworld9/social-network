import { useState } from "react";
import classNames from "classnames";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";

import { SharePostModal } from "./Modal";

import s from "./index.module.css";

export const SharePostButton = ({
  postId,
  className,
}: SharePostButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="text"
        className={classNames(className, s.button)}
        startIcon={<ForwardRoundedIcon />}
        onClick={() => setShowModal(true)}
      >
        Share
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className={s.dialog}
        PaperProps={{ className: s.paper }}
      >
        <SharePostModal postId={postId} />
      </Dialog>
    </>
  );
};
