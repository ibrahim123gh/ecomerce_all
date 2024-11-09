/* eslint-disable react/prop-types */
import { StoreContext } from "../StoreContext/StoreContext";
import "./Fooddisplay.css";
import { useContext, useState } from "react";

const FoodDisplay = ({ id, image, name, price, desc, startKey }) => {

  const [stars, setStars] = useState({});
  const { addOrder, removeOrder, orderBy } = useContext(StoreContext);

  function handling(index, value) {
    setStars((x) => ({
      ...x,
      [index]: value,
    }));
  }
  return (
    <div className="container_display">
      <div className="cont_img">
        <img src={`http://localhost:4000/images/`+image} alt="" />
        {!orderBy[id] ? (
          <button className="btn" onClick={() => addOrder(id)}>
            <i className="fa-solid fa-plus"></i>
          </button>
        ) : (
          <div className="cont_order">
            <button className="minus" onClick={() => removeOrder(id)}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <p>{orderBy[id]}</p>
            <button className="plus" onClick={() => addOrder(id)}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        )}
      </div>
      <div className="cont_all_display">
        <div className="preview">
          <h5>{name}</h5>
          <div className="start">
            {[1, 2, 3, 4, 5].map((x) => {
              return (
                <i
                  key={x}
                  className={`fa fa-star ${
                    stars[startKey] >= x ? "active-star" : ""
                  }`}
                  onClick={() => handling(startKey, x)}
                ></i>
              );
            })}
          </div>
        </div>
        <p>{desc}</p>
        <h4>${price}</h4>
      </div>
    </div>
  );
};

export default FoodDisplay;
