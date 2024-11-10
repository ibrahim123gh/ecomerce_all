import FoodDisplay from "../foodDisplay/FoodDisplay";
import "./food.css";
import { StoreContext } from "../StoreContext/StoreContext";
import { useContext } from "react";

const Food = () => {
  const { food_list, filterData } = useContext(StoreContext);
  console.log(food_list);

  return (
    <div className="food">
      <div className="food_title">
        <h2>Top dishes near you</h2>
        <div className="container_food">
          {food_list.map((items, index) => {
            if (filterData === "" || filterData === items.category._id) {
              return (
                <div key={index}>
                  <FoodDisplay
                    startKey={index}
                    id={items._id}
                    image={items.image}
                    name={items.name}
                    price={items.price}
                    desc={items.description}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Food;
