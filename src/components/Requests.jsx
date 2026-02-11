import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      // console.log(res.data.connectionRequestsRecieved);
      dispatch(addRequests(res.data.connectionRequestsRecieved));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReview = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      dispatch(addRequests(requests?.filter((r) => r._id !== requestId)));
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
      <div className="min-h-screen bg-base-200 py-10">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Requests Recieved</h1>
          <span className="text-sm opacity-70">
            {requests?.length || 0} total
          </span>
        </div>

        {requests?.length ? (
          <div className="grid gap-4">
            {requests.map((request) => {
              const { firstName, age, photoUrl, about } = request.fromUserId;
              return (
                <div key={request._id} className="card card-side bg-base-100 shadow-md">
                  <figure className="p-4 flex-none">
                    <img
                      src={photoUrl || "https://via.placeholder.com/120?text=No+Photo"}
                      alt={firstName ? `${firstName} photo` : "profile photo"}
                      className="h-24 w-24 rounded-full object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <div className="card-body min-w-0">
                    <div className="flex items-center gap-3">
                      <h2 className="card-title">{firstName || "User"}</h2>
                      {age && (
                        <span className="badge badge-ghost text-xs">
                          {age}
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-80 line-clamp-3">
                      {about || "No bio yet."}
                    </p>
                    <div className="card-actions justify-end gap-3">
                      <button
                        className="btn btn-outline btn-error"
                        onClick={() => handleReview("rejected", request._id)}
                      >
                        Ignore
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleReview("accepted", request._id)}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <p className="opacity-70">No Requests Recieved yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default Requests;
