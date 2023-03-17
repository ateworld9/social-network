import { memo, ComponentPropsWithoutRef } from "react";

import { API_PREFIX } from "@shared/config/constants";

type MediaProps = {
  filename: string;
  alt: string;
} & ComponentPropsWithoutRef<"img">;

const Media = ({ filename, alt, ...args }: MediaProps) => {
  return (
    <img src={`${API_PREFIX}/public/images/${filename}`} alt={alt} {...args} />
  );
};
const MemoMedia = memo(Media);

export { Media, MemoMedia };
