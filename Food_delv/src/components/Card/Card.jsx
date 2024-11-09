import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { StoreContext } from "../StoreContext/StoreContext";

const Card = () => {
  const { food_list, orderBy, setOrderBy, totale_price } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const remove = (itsId) => {
    setOrderBy((prev) => ({ ...prev, [itsId]: 0 }));
  };
  const handleSort = () => {
    if(totale_price()>0){
      navigate("/order");
    }
  }

  return (
    <div className="card">
      <div className="card_container">
        <div className="title_card">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Totale</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
      </div>
      {food_list.map((items, index) => {
        if (orderBy[items._id]) {
          return (
            <div className="card_all" key={index}>
              <div className="container_car title_card" key={index}>
                <p>
                  <img
                    src={`http://localhost:4000/images/` + items.image}
                    alt=""
                  />
                </p>
                <p>{items.name}</p>
                <p>${items.price}</p>
                <p>{orderBy[items._id]}</p>
                <p>${orderBy[items._id] * items.price}</p>
                <p className="close" onClick={() => remove(items._id)}>
                  <i className="fa-solid fa-xmark"></i>
                </p>
              </div>
              <hr />
            </div>
          );
        }
      })}
      <div className="fatoura">
        <div className="card_fatoura">
          <div className="fatou_totale">
            <h2>Cart Totals</h2>
            <div className="container_fatoura">
              <div className="fatoura_right">
                <p>Subtotale</p>
                <p>${totale_price()}</p>
              </div>
              <hr />
              <div className="fatoura_right">
                <p>Delevery Fee</p>
                <p>${totale_price() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="fatoura_right">
                <b>Totale</b>
                <b>${totale_price() === 0 ? 0 : totale_price() + 2}</b>
              </div>
              <hr />
              <button onClick={handleSort} className="btn_fatoura">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
          <div className="fatoura_left">
            <p>If you have a promo code, please enter it here:</p>
            <div className="fatouran_input">
              <input type="text" placeholder="Enter promo code" />
              <button className="btn_fatoura">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
