import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err:any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input style={{ width: "210px", margin: "10px" }} className="form-control" value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <input style={{ width: "210px", margin: "10px" }} className="form-control" value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <button  className="btn btn-primary ms-2" onClick={signup}> Signup </button>
    </div>
  );
}
