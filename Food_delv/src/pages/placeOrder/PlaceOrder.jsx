import "./palceOrder.css";
import { StoreContext } from "../../components/StoreContext/StoreContext";
import { useContext, useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [data, setData] = useState({
    first: "",
    last: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const { totale_price, food_list, orderBy, token } = useContext(StoreContext);

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderItems = [];
    food_list.map((item) => {
      if (orderBy[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = orderBy[item._id];
        orderItems.push(itemInfo);
      }
    });
    const responce = await axios.post(
      "http://localhost:4000/api/order/purch",
      {
        items: orderItems,
        amount: totale_price() + 2,
        address: data,
      },
      { headers: { token } }
    );
    console.log(responce);
    if (responce.data.success) {
      const success_url = responce.data.success_url; 
      window.location.replace(success_url);
    } else {
      alert(responce.data.message);
    }
  };

  return (
    <div className="place">
      <h1>Delevery Information</h1>
      <div className="place_order">
        <div className="right_place">
          <form>
            <div className="info">
              <input
                type="text"
                name="first"
                value={data.first}
                onChange={handleData}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="last"
                placeholder="Last Name"
                value={data.last}
                onChange={handleData}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleData}
              placeholder="Email Address"
              required
            />
            <input
              type="text"
              name="street"
              value={data.street}
              onChange={handleData}
              placeholder="Street"
              required
            />
            <div className="info">
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={handleData}
                placeholder="City"
                required
              />
              <input
                type="text"
                value={data.state}
                onChange={handleData}
                name="state"
                placeholder="State"
                required
              />
            </div>
            <div className="info">
              <input
                type="text"
                value={data.zip}
                onChange={handleData}
                name="zip"
                placeholder="Zip Code"
                required
              />
              <input
                type="text"
                value={data.country}
                onChange={handleData}
                name="country"
                placeholder="Country"
                required
              />
            </div>
            <input
              type="text"
              value={data.phone}
              onChange={handleData}
              name="phone"
              placeholder="Phone"
              required
            />
          </form>
        </div>
        <div className="left_place">
          <div className="fat">
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
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn_fatoura"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
