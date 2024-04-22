import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setUser } from "./userReducer";
import { useDispatch, useSelector } from "react-redux";
export default function Signup() {
  const [error, setError] = useState("");
  const user = useSelector((state:any) => state.userReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    try {
      const newUser = await client.signup(user);
      dispatch(setUser(newUser));
      navigate("/Kanbas/Account/Profile");
    } catch (err:any) {
        setError(err.response.data.message);
    }
  };
  
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input className="form-control" value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <input className="form-control" value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <button className="btn btn-primary mt-2" onClick={signup}> Signup </button>
      <Link to="/Kanbas/Account/Signin" className="btn btn-secondary ms-2 mt-2">  Signin </Link>
    </div>
  );
}
