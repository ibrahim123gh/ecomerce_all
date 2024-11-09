import { useEffect, useState } from "react";
import axios from "axios";
import box from "../../assets/box.png";
import "./order.css";
import { toast } from "react-toastify";


const Order = () => {
  const [orders, setOrders] = useState([]);

  const handleOrder = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/order/list",
      {}
    );
    console.log(response.data);
    setOrders(response.data.data);
  };

  const hundleSubmit = async (e,id)=>{
    const response = await axios.post("http://localhost:4000/api/order/staus",{
      id:id,
      status:e.target.value
    })
    if(response.data.success){
      toast.success(response.data.message);
      handleOrder();
    }else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    handleOrder();
  }, []);

  return (
    <div className="order">
      <h2>One Page</h2>
      {orders.map((items, index) => {
        return (
          <div className="order_data" key={index}>
            <img src={box} alt="" />
            <div className="container_info">
              <div className="info">
                {items.items.map((ord, index) => {
                  if (index === items.items.length - 1) {
                    return <b key={index}>{ord.name + " x " + ord.quantity}</b>;
                  } else {
                    return (
                      <b key={index}>
                        {ord.name + " x " + ord.quantity + " , "}
                      </b>
                    );
                  }
                })}
              </div>
              <p>
                {items.address.first} {items.address.last}
              </p>
              <p>{items.address.street}</p>
              <p>
                {items.address.city},{items.address.state},
                {items.address.country},{items.address.zip}
              </p>
              <p>{items.address.phone}</p>
            </div>
            <p style={{ textAlign: "center" }}>Items : {items.items.length}</p>
            <p>${items.amount}</p>
            <select onChange={(e) => hundleSubmit(e,items._id)} value={items.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Food Delevery">Food Delevery</option>
              <option value="">Food Delivered</option>
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
