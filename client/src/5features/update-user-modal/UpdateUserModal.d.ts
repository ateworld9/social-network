declare type UpdateUserModalState = false | "avatar" | "cover";

declare type UpdateUserModalProps = {
  open: UpdateUserModalState;
  onClose: () => void;
  handler: (mediaId: MediaId) => void;
  title?: string;
};
