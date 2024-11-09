import FoodDisplay from "../foodDisplay/FoodDisplay";
import "./food.css";
import { StoreContext } from "../StoreContext/StoreContext";
import { useContext} from "react";

// eslint-disable-next-line react/prop-types
const Food = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food">
      <div className="food_title">
        <h2>Top dishes near you</h2>
        <div className="container_food">
          {food_list.map((items, index) => {
            if(category === "All" || category === items.category){
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
            }})
            }
        </div>
      </div>
    </div>
  );
};

export default Food;
