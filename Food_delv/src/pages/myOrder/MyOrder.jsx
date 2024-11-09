import { useContext, useEffect, useState } from "react";
import "./myOrder.css";
import { StoreContext } from "../../components/StoreContext/StoreContext";
import axios from "axios";
import box from "../../assets/box.png";

const MyOrder = () => {
  const [myOrder, setMyOrder] = useState([]);
  const { token } = useContext(StoreContext);

  const handleOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/order/getOrder",
        {},
        { headers: { token } }
      );
      setMyOrder(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      handleOrder();
    }
  }, [token]);


  return (
    <div className="myOrder">
      <h1>My Orders</h1>
      {myOrder ?myOrder.map((item, index) => {
        return (
          <div className="orderList" key={index}>
            <img src={box} alt="" />
            {item.items.map((ord, index) => {
              if (index === item.items.length - 1) {
                return ord.name + " x " + ord.quantity;
              } else {
                return ord.name + "x" + ord.quantity + ", ";
              }
            })}
            <p>${item.amount}.00</p>
            <p>item : {item.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              {item.status}
            </p>
            <button onClick={() => handleOrder()}>Track Order</button>
          </div>
        );
      })
    : <p>No orders found</p>}
    </div>
  );
};

export default MyOrder;
