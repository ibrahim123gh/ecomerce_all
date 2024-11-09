import { useContext, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../StoreContext/StoreContext";
import user from "../../assets/user.png";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setShow }) => {
  const [act, setAct] = useState("");
  const { token, setOrderBy, setToken, totale_price } =
    useContext(StoreContext);
  const navigate =  useNavigate();


  const logout = () => {
    localStorage.removeItem("token","")
    setToken("");
    setOrderBy([])
    navigate("/")
  };

  return (
    <div className="navbar">
      <div className="right_bar">
        <Link to={"/"}>
          <img src="/src/assets/logo.png" alt="" />
        </Link>
      </div>
      <div className="center_bar">
        <ul className="ul-bar">
          <Link
            to="/"
            onClick={() => setAct("home")}
            className={act === "home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="#menu"
            onClick={() => setAct("menu")}
            className={act === "menu" ? "active" : ""}
          >
            menu
          </a>
          <a
            href="#download"
            onClick={() => setAct("mobile")}
            className={act === "mobile" ? "active" : ""}
          >
            mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setAct("contact")}
            className={act === "contact" ? "active" : ""}
          >
            contact us
          </a>
        </ul>
      </div>
      <div className="left_menu">
        <i className="fa-solid fa-magnifying-glass"></i>
        <Link to="/card">
          <i className="fa-brands fa-jedi-order point">
            {totale_price() === 0 ? "" : <span></span>}
          </i>
        </Link>
        {!token ? (
          <button type="submit" onClick={() => setShow(true)}>
            Sign in
          </button>
        ) : (
          <div className="profile">
            <img src={user} alt="" />
            <ul>
              <Link to="/myorder">
                <li>
                  <i className="fa-solid fa-shop icon"></i>
                  <span>Orders</span>
                </li>
              </Link>
              <hr />
              <li onClick={() => logout()}>
                <i className="fa-solid fa-right-from-bracket icon"></i>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
