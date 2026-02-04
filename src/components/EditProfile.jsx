import  { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editUser } from '../utils/userSlice';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {
const {firstName, lastName, age, photoUrl, about, gender}  = user;
const [editFirstName, setFirstName] = useState(firstName);
const [editLastName, setLastName] = useState(lastName);
const [editAge, setAge] = useState(age);
const [editPhotoUrl, setPhotoUrl] = useState(photoUrl);
const [editAbout, setAbout] = useState(about);
const [editGender, setGender] = useState(gender)
const [error, setError] = useState("")

const dispatch = useDispatch();
const saveProfile = async () =>{
    try{
       const res = await axios.patch( BASE_URL + "/profile/edit",{
        firstName : editFirstName,
        lastName : editLastName,
        age :editAge,
        photoUrl : editPhotoUrl,
        about : editAbout,
        gender,editGender
       },{
        withCredentials : true
       }) 
       console.log(res);
       dispatch(editUser(res?.data?.data));
    }catch(err){
        console.log(err.response.data)
        setError(err.response.data);
    }
}
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
            <input
              type="text"
              value={editGender}
              onChange={(e) => setGender(e.target.value)}
              className="input"
              placeholder="Edit your Gender"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">PhotoUrl</legend>
            <input
              type="text"
              value={editPhotoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input"
              placeholder="Edit your PhotoUrl"
            />
          </fieldset>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              value={editAbout}
              onChange={(e) => setAbout(e.target.value)}
              className="input"
              placeholder="Edit your About"
            />
          </fieldset>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName: editFirstName, about: editAbout, photoUrl: editPhotoUrl, age: editAge }} />
    </div>
  )
}

export default EditProfile
