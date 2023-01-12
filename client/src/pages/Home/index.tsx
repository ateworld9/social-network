import { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/store";

import Posts from "../../features/Posts";
import { fetchPosts } from "./homeThunks";

// const stories = [
//   { id: 2, name: "Jane Doe", img: "https://picsum.photos/1500/1500" },
//   { id: 3, name: "Jane Doe", img: "https://picsum.photos/1500/1500" },
//   { id: 4, name: "Jane Doe", img: "https://picsum.photos/1500/1500" },
//   { id: 5, name: "Jane Doe", img: "https://picsum.photos/1500/1500" },
// ];

const Home = () => {
  const dispatch = useAppDispatch();

  const posts = useTypedSelector((state) => state.home.posts);
  const isPostsLoading = useTypedSelector((state) => state.home.isPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts({ fields: {} }));
  }, [dispatch]);

  return <Posts posts={posts} isLoading={isPostsLoading} />;
};

export default Home;
// <div style={{ padding: "1cqw 3cqw" }}>
// storis
// {/* <Stories stories={stories} /> */}
// </div>
