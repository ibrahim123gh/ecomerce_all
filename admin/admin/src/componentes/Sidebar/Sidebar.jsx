import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar_admin">
      <NavLink to="/category" className="side">
        <i className="fa-solid fa-circle-plus"></i>
        <p>Add Category</p>
      </NavLink>
      <NavLink to="/add" className="side">
        <i className="fa-solid fa-circle-plus"></i>
        <p>Add Items</p>
      </NavLink>
      <NavLink to="/listCategory" className="side">
        <i className="fa-solid fa-table"></i>
        <p>List Category</p>
      </NavLink>
      <NavLink to="/list" className="side">
        <i className="fa-regular fa-square-check"></i>
        <p>List Items</p>
      </NavLink>
      <NavLink to="/order" className="side">
        <i className="fa-solid fa-box"></i>
        <p>Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
