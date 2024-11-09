import "./explorOur.css";
import { Data } from "../data/data";

// eslint-disable-next-line react/prop-types
const ExplorOur = ({ setCategory, category }) => {
  return (
    <div className="explor-menu" id="menu">
      <div className="txt-menu">
        <h2>Explore Our menu</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <div className="menu">
          {Data.map((items, index) => {
            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === items.name ? "All" : items.name
                  )
                }
                className="menu-item"
                key={index}
              >
                <img
                  src={items.image}
                  className={category === items.name ? "active" : ""}
                  alt=""
                />
                <h3>{items.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExplorOur;
