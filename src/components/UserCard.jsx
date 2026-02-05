const UserCard = ({ user, showActions = true }) => {
  const { firstName, age, photoUrl, about } = user || {};
  const cardBodyClass = showActions ? "card-body" : "card-body pb-4";
  return (
    <div className="flex justify-center border-1 border-cream-100 rounded w-90">
      <div className="card bg-black-100 w-96 shadow-sm align-center">
        <figure className="w-full overflow-hidden">
          <img
            src={
              photoUrl || "https://via.placeholder.com/600x400?text=No+Photo"
            }
            alt={firstName ? `${firstName} photo` : "profile photo"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </figure>
        <div className={cardBodyClass}>
          <div className="flex items-end gap-3">
            <h2 className="card-title text-2xl">{firstName}</h2>
            <h2 className="card-title">{age}</h2>
          </div>
          <span>{about}</span>

          {showActions && (
            <div className="card-actions justify-center gap-6 pb-6 mt-6">
              <button
                className="h-12 w-20 rounded border-2 border-rose-500 text-rose-500 text-xl font-semibold shadow-sm transition hover:bg-rose-500 hover:text-white"
                aria-label="Ignore"
                title="Ignore"
              >
                Ignore
              </button>
              <button
                className="h-12 w-30 rounded border-2 border-emerald-500 text-emerald-500 text-xl font-semibold shadow-sm transition hover:bg-emerald-500 hover:text-white"
                aria-label="Interested"
                title="Interested"
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
