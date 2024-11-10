import { useState } from "react";
import "./explorOur.css";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../StoreContext/StoreContext";

// eslint-disable-next-line react/prop-types
const ExplorOur = () => {
  const { filterData, seFilterData } = useContext(StoreContext)
  const [categorys, setCategorys] = useState([]);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/category/list"
      );
      console.log(response.data.categ);
      setCategorys(response.data.categ);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  console.log(filterData);
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
          {categorys.map((items, index) => {
            return (
              <div
                onClick={() =>
                  seFilterData((prev) => (prev === items._id ? "" : items._id))
                }
                className="menu-item"
                key={index}
              >
                <img
                  src={`http://localhost:4000/images/` + items.image}
                  className={filterData === items._id ? "active" : ""}
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
