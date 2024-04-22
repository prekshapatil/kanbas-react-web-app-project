import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div>
      <h1>Signin</h1>
      <input
        type="text"
        className="form-control"
        style={{ width: "200px", margin: "10px" }}
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        type="text"
        className="form-control"
        style={{ width: "200px", margin: "10px" }}
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button className="btn btn-primary ms-2" onClick={signin}>
        {" "}
        Signin{" "}
      </button>

      <br></br>
        <br></br>
          Don't have an account?{" "}
          <br></br>
          <Link
            to="/Kanbas/Account/Signup"
            className="btn btn-primary ms-2"
            style={{ width: "100px" }}
          >
            {" "}
            Sign Up{" "}
          </Link>
    </div>
  );
}
