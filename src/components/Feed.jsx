import { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store)=> store.feed);
  const fetchFeed = async () => {
    try {
      let userFeed = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(userFeed?.data?.allUsers[0]));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return userFeed && (
  <UserCard user={userFeed}/> );
};

export default Feed;
