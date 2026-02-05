import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);
  const currentUser = useSelector((store) => store.user);
  console.log(currentUser)
  const [isLoading, setIsLoading] = useState(true);
  const fetchFeed = async () => {
    try {
      let userFeed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(userFeed?.data?.allUsers[0]));
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (isLoading) {
    const profilePhoto =
      currentUser?.data?.photoUrl || "https://via.placeholder.com/120?text=You";
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-28 w-28 rounded-full bg-rose-400/30 animate-ping"></span>
          <span className="absolute h-36 w-36 rounded-full border-2 border-rose-400/40"></span>
          <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-rose-500 shadow-md">
            <img
              src={profilePhoto}
              alt="Your profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    userFeed && (
      <div className="flex items-center justify-center m-10">
        <UserCard user={userFeed} />
      </div>
    )
  );
};

export default Feed;
