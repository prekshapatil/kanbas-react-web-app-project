import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import { setUser} from "./userReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const user = useSelector((state:any) => state.userReducer.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signin = async () => {
    try{
        const newUser = await client.signin(credentials);
        console.log(newUser);
        dispatch(setUser(newUser));
        navigate("/Kanbas/Account/Profile");
    }
    catch (err:any) {
        setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (user.username !== "") {
      navigate("/Kanbas/Account/Profile");
    }
  }, [user]);

  return (
    <div>
      <h1>Signin</h1>
    {error && <div>{error}</div>}
      <input className="form-control" value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/>
      <input className="form-control" value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })}/>
      <button className="btn btn-primary mt-2" onClick={signin}> Signin </button>
      <Link to="/Kanbas/Account/Signup" className="btn btn-secondary ms-2 mt-2">  Signup </Link>
    </div>
  );
}
