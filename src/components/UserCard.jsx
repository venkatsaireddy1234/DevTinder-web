
const UserCard = ({ user }) => {
  const { firstName, age, photoUrl, about } = user || {};
  return (
    <div className="flex justify-center border-1 border-cream-100 rounded">
      <div className="card bg-black-100 w-96 shadow-sm align-center">
        <figure className="h-64 w-full overflow-hidden">
          <img
            src={photoUrl || "https://via.placeholder.com/600x400?text=No+Photo"}
            alt={firstName ? `${firstName} photo` : "profile photo"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName}</h2>
           <span>{about}</span>
          <span>{age}</span>
        <div className="card-actions justify-center gap-6 pb-6">
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
        </div>

      </div>
    </div>
  );
};

export default UserCard;
