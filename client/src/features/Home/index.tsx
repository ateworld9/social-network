import { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/store";

import Posts from "../Posts";
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

  return (
    <>
      <div style={{ padding: "20px 70px" }}>
        storis
        {/* <Stories stories={stories} /> */}
      </div>
      <Posts posts={posts} isLoading={isPostsLoading} />
    </>
  );
};

export default Home;
