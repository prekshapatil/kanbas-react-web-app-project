import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser, removeUser } from "./userReducer";
import { useDispatch, useSelector } from "react-redux";
export default function Profile() {
  const [profile, setProfile] = useState(useSelector((state:any) => state.userReducer.user));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const signout = async () => {
    await client.signout();
    dispatch(removeUser());
    navigate("/Kanbas/Account/Signin");
  };
  const save = async () => {
    await client.updateUser(profile);
    navigate("/Kanbas/Account/Profile");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
        <div style={{display:"flex"}}>
        <h1>Profile</h1>
      <button style={{marginLeft: "auto"}} className="btn btn-primary " onClick={save}>
            Save
      </button>
        </div>
      {profile && (
        <div>
        <Link to="/Kanbas/Account/Admin/Users"
            className="btn btn-warning w-100">
            Users
        </Link>
          <input className="form-control" value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/>
          <input className="form-control" value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })}/>
          <input className="form-control" value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/>
          <input className="form-control" value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/>
          <input className="form-control" value={profile.dob?.split('T')[0]} type="date" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/>
          <input className="form-control" value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/>
          <select className="form-control" value={profile.role} onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        <button className="btn btn-primary mt-2" onClick={save}>
            Save
        </button>
        <button className="btn btn-danger ms-2 mt-2" onClick={signout}>
        Signout
        </button>
        </div>
      )}
    </div>
  );
}
