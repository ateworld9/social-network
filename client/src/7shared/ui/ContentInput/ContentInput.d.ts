declare type ContentInputProps = {
  label: string;
  placeholder: string;
  handler: (text: string, images: Media[]) => void;
  className?: string;
};

type PreviewProps = {
  preview: string[];
  progressInfos: ProgressInfo[];
  onDeleteFile: (src: string) => void;
};

type AttachedImageProps = {
  src: string;
  loading?: number;
  onDeleteFile: (src: string) => void;
};
declare type ProgressInfo = { percentage: number; fileName: string };
