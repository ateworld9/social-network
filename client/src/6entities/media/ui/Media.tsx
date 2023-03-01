import { memo, ComponentPropsWithoutRef } from "react";

import { API_PREFIX } from "@shared/config/constants";
import { useTypedSelector } from "@shared/hooks";

import { selectById } from "../model";

type MediaProps = {
  mediaId: MediaId;
  alt: string;
} & ComponentPropsWithoutRef<"img">;

const Media = ({ mediaId, alt, ...args }: MediaProps) => {
  const media = useTypedSelector((state) => selectById(state, mediaId));

  return (
    <img
      src={`${API_PREFIX}/public/images/${media?.filename}`}
      alt={alt}
      {...args}
    />
  );
};
const MemoMedia = memo(Media);

export { Media, MemoMedia };
