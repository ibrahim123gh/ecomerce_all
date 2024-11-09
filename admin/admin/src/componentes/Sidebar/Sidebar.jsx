import { NavLink } from "react-router-dom";
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar_admin">
      <NavLink to="/add" className="side">
        <i className="fa-solid fa-circle-plus"></i>
        <p>Add Items</p>
      </NavLink>
      <NavLink to="/list" className="side">
        <i className="fa-regular fa-square-check"></i>
        <p>List Items</p>
      </NavLink>
      <NavLink to="/order" className="side">
        <i className="fa-regular fa-square-check"></i>
        <p>Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
