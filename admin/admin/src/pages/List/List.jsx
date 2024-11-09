import "./List.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";

  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const resopnse = await axios.get(`${url}/api/food/list`);
    setItems(resopnse.data);
  };

  const removeItems = async (itemsId) => {
    const resopnse = await axios.delete(`${url}/api/food/remove`, {
      data: { id: itemsId },
    });
    await fetchData();

    if (resopnse.data.success) {
      toast.success(resopnse.data.message);
    } else {
      toast.error(resopnse.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list_admin">
      <h3>All Food List</h3>
      <div className="head_list title_list">
        <b>Image</b>
        <b>Name</b>
        <b>Price</b>
        <b>Category</b>
        <b>Remove</b>
      </div>
      {items.map((item, index) => {
        return (
          <div className="head_list body_list" key={index}>
            <p>
              <img src={`${url}/images/` + item.image} alt="" />
            </p>
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{item.category}</p>
            <p>
              <i
                onClick={() => removeItems(item._id)}
                className="fa-solid fa-xmark close"
              ></i>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
