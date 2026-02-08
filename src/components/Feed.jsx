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
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fetchFeed = async () => {
    try {
      let userFeed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(userFeed?.data?.allUsers));
      setCurrentIndex(0);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleFeedAction = async (status) => {
    const currentUserInFeed = userFeed?.[currentIndex];
    if (!currentUserInFeed?._id) return;
    try {
      setIsActionLoading(true);
      await axios.post(
        BASE_URL + `/request/send/${status}/${currentUserInFeed._id}`,
        {},
        { withCredentials: true },
      );
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsActionLoading(false);
    }
  };
  if (isLoading) {
    const profile = currentUser?.data || currentUser;
    const photo = profile?.photoUrl;
    const profilePhoto = photo || "https://via.placeholder.com/120?text=You";
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

  const currentCard = userFeed?.[currentIndex];

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">No users found</h2>
            <p className="opacity-70">
              Try again later or update your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center m-10">
      <UserCard
        user={currentCard}
        onIgnore={() => handleFeedAction("ignored")}
        onAccept={() => handleFeedAction("interested")}
        isLoading={isActionLoading}
      />
    </div>
  );
};

export default Feed;
