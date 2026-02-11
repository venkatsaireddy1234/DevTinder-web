import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const { firstName, lastName, age, photoUrl, about, gender } =
    user?.data || user?.data?.user || user;
  const [editFirstName, setFirstName] = useState(firstName);
  const [editLastName, setLastName] = useState(lastName);
  const [editAge, setAge] = useState(age);
  const [editPhotoUrl, setPhotoUrl] = useState(photoUrl);
  const [photoFileName, setPhotoFileName] = useState("");
  const [editAbout, setAbout] = useState(about);
  const [editGender, setGender] = useState(gender || "Other");
  const [error, setError] = useState("");
  const [loadToast, setLoadToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: editFirstName,
          lastName: editLastName,
          age: editAge,
          photoUrl: editPhotoUrl,
          about: editAbout,
          gender: editGender,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(editUser(res?.data?.user));
      setLoadToast(true);
      setError("");
    } catch (err) {
      setError(err.response.data);
      setLoadToast(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!loadToast) return;
    const timer = setTimeout(() => setLoadToast(false), 3000);
    return () => clearTimeout(timer);
  }, [loadToast]);

  useEffect(() => {
    setFirstName(firstName || "");
    setLastName(lastName || "");
    setAge(age || "");
    setPhotoUrl(photoUrl || "");
    setAbout(about || "");
    setGender(gender || "Other");
  }, [firstName, lastName, age, photoUrl, about, gender]);
  return (
    <div className="flex justify-center gap-5 mt-20 ">
      <div className="card card-border bg-base-300 w-96 my-10">
        <div className="card-body ">
          <h2 className="card-title">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              value={editFirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="Edit your FirstName"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              value={editLastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder="Edit your Last Name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              value={editAge}
              onChange={(e) => setAge(e.target.value)}
              className="input"
              placeholder="Edit your Age"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <div className="flex gap-4">
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={editGender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="radio"
                />
                <span className="label-text">Male</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={editGender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="radio"
                />
                <span className="label-text">Female</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={editGender === "Other"}
                  onChange={(e) => setGender(e.target.value)}
                  className="radio"
                />
                <span className="label-text">Other</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo</legend>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="file-input file-input-bordered w-full"
            />
            {photoFileName && (
              <span className="text-xs opacity-70">
                Selected: {photoFileName}
              </span>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              type="text"
              value={editAbout}
              onChange={(e) => setAbout(e.target.value)}
              className="input"
              placeholder="Edit your About"
              rows="10"
              cols="50"
            />
          </fieldset>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard
        user={{
          firstName: editFirstName,
          about: editAbout,
          photoUrl: editPhotoUrl,
          age: editAge,
          gender: editGender,
        }}
        showActions={false}
      />
      {loadToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Succesfully edited your profile.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
