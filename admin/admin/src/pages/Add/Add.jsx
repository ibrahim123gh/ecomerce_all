/* eslint-disable react/prop-types */
import "./Add.css";
import upload from "../../assets/upload.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ categories }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const setDa = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("image", image);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/food/add",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success(response.data.message);
        setData({
          name: "",
          description: "",
          price: "",
          category: "...",
        });
        setImage(false);
      } catch (error) {
        console.log(error);
        toast.error("error");
      }
    } else {
      alert("enter a image");
    }
  };

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className="add_items">
      <form onSubmit={onSubmit}>
        <div className="inp_add">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : upload} alt="" />
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            hidden
          />
        </div>
        <div className="add_inp">
          <p>Product Name</p>
          <input
            type="text"
            placeholder="Type Here"
            name="name"
            value={data.name}
            onChange={setDa}
          />
        </div>
        <div className="add_inp">
          <p>Product description</p>
          <textarea
            name="description"
            placeholder="Write content here"
            value={data.description}
            onChange={setDa}
          ></textarea>
        </div>
        <div className="add_price_cat">
          <div className="option">
            <p>Product Category</p>
            <select name="category" value={data.category} onChange={setDa}>
            <option value="...">...</option>
              {categories.map((items, index) => {
                return (
                  <option value={items._id} key={index}>
                    {items.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="price">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="20$"
              value={data.price}
              onChange={setDa}
            />
          </div>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

export default Add;
