import "./footer.css"

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer_content">
        <div className="footer_right">
            <h2>Tomato</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            illo quidem distinctio est sint, at iste aliquid unde doloremque
            quia, sunt perspiciatis numquam magni hic! Numquam tenetur nisi
            dolores facere!
          </p>
          <div className="container_foot">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
        </div>
        <div className="footer_center">
          <h3>COMPANY</h3>
          <ul className="">
            <li>Home</li>
            <li>About Us</li>
            <li>Delevery</li>
            <li>Private Policy</li>
          </ul>
        </div>
        <div className="footer_left">
          <h3>GET IN TOUCH</h3>
          <ul className="">
            <li>+1 212-456-777</li>
            <li>ibrahimibra9708@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
