import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectonsSlice";

const Connections = () => {
  const allConnections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Connections</h1>
          <span className="text-sm opacity-70">
            {allConnections?.length || 0} total
          </span>
        </div>

        {allConnections?.length ? (
          <div className="grid gap-4">
            {allConnections.map((connection) => {
              const { firstName, age, photoUrl, about, _id } = connection;
              return (
                <div key={_id} className="card card-side bg-base-100 shadow-md">
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
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <p className="opacity-70">No connections yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
