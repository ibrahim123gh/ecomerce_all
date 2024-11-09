import photo from "../../assets/photo.png"
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
      <div className="navbar_admin">
        <div className="right_bar">
          <h3>Tomato <span>.</span></h3>
          <p>Admin Panel</p>
        </div>
        <img src={photo} alt="" />
      </div>
      <hr />
    </>
  );
}

export default Navbar
