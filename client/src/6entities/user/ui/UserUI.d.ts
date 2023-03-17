type UsernameProps = Pick<User, "name" | "surname" | "username"> & {
  className?: string;
  tag?: boolean;
};
type UsernameLinkProps = UsernameProps & { userId: UserId };

type UserAvatarProps = {
  filename: string;
  className?: string;
} & ComponentPropsWithoutRef<"img">;
type UserAvatarLinkProps = UserAvatarProps & { userId: UserId };
