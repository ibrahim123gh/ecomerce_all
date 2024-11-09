/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../StoreContext/StoreContext";

const Login = ({ setShow }) => {
  const { setToken } = useContext(StoreContext);
  const [loreg, setLogEeg] = useState("Sign Up");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handle = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    if (loreg === "Sign Up") {
      url = "http://localhost:4000/api/user/register";
    } else{
      url = "http://localhost:4000/api/user/login";
    }

    const responce = await axios.post(url, user);

    if (responce.data.success) {
      toast.success(responce.data.message);
      setToken(responce.data.token);
      localStorage.setItem("token", responce.data.token);
      navigate("/");
      setShow(false);
    } else {
      toast.error(responce.data.message);
    }
  };

  return (
    <div className="login_register">
      <div className="cont_logi">
        <div className="close">
          <h2>{loreg}</h2>
          <button onClick={() => setShow(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="input_log">
            {loreg === "Sign Up" ? (
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={handle}
              />
            ) : (
              ""
            )}
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={user.email}
              onChange={handle}
            />
            <input
              type="password"
              placeholder="**********"
              name="password"
              value={user.password}
              onChange={handle}
            />
          </div>
          <button type="submit">
            {loreg === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="check">
          <input type="checkbox" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {loreg === "Sign Up" ? (
          <p>
            Alredy have in account?
            <span onClick={() => setLogEeg("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span onClick={() => setLogEeg("Sign Up")}>Sign Up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
