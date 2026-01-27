import React from "react";

const UserCard = ({ feed }) => {
  const { firstName, photoUrl ,about } = feed;

console.log(feed);
  return (
    feed && (
      <div className="flex justify-center">
        <div className="card bg-white-100 w-96 shadow-sm ">
          <div className="card-body">
            <h2 className="card-title">{firstName}</h2>
            <p>
              {about}
            </p>
          </div>
          <figure>
            <img
              src={photoUrl}
              alt="photo"
            />
          </figure>
        </div>
      </div>
    )
  );
};

export default UserCard;
