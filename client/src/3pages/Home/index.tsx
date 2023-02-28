import { useEffect } from "react";
import { useAppDispatch } from "../../7shared/hooks";

import { Posts } from "../../4widgets/post";
import { fetchPosts } from "./homeThunks";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts({}));
  }, [dispatch]);

  return <Posts />;
};

export default Home;
