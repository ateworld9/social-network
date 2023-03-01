import { useEffect } from "react";
import { useAppDispatch } from "@shared/hooks";

import { Posts } from "@widgets/post";
import { fetchPosts } from "./homeThunks";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts({}));
  }, [dispatch]);

  return <Posts />;
};

export default Home;
