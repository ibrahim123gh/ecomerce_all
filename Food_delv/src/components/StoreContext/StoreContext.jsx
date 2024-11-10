/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [filterData, seFilterData] = useState("");

  const [orderBy, setOrderBy] = useState([])

  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const fetchData = async () => {
    const response = await axios.post("http://localhost:4000/api/food/list", {
      id: filterData,
    });
    console.log(filterData);
    setFood_list(response.data);
    console.log(food_list);
  };

  const getData = async (token) => {
    try{
      const response = await axios.post(
        "http://localhost:4000/api/items/AllList",
        {},
        { headers: { token } }
      );
      setOrderBy(response.data.userData);

    }catch(error){
      console.error("There was an error fetching the orders:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [filterData]);

  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await getData(localStorage.getItem("token"));
      }
    };
    loadData();
  }, [localStorage.getItem("token")]);

  const addOrder = async (itemsId) => {
    if(localStorage.getItem("token")){
      setOrderBy((prev) => ({
        ...prev,
        [itemsId]: (prev[itemsId] || 0) + 1,
      }));
  
      await axios.post(
        "http://localhost:4000/api/items/add",
        { itemId: itemsId },
        { headers: { token } }
      );
    }else{
      toast.error("please login");
    }
  };

  const removeOrder = async (itemsId) => {
        if(localStorage.getItem("token")){

    setOrderBy((prev) => ({
      ...prev,
      [itemsId]: Math.max((prev[itemsId] || 1) - 1, 0),
    }));

    await axios.post(
      "http://localhost:4000/api/items/remove",
      { itemId: itemsId },
      { headers: { token } }
    );
  }else{
      toast.error("please login");
  }
  };

  const totale_price = () => {
    return Object.entries(orderBy).reduce((total, [itemId, quantity]) => {
      if (quantity > 0) {
        const item = food_list.find((product) => product._id === itemId);
        return item ? total + item.price * quantity : total;
      }
      return total;
    }, 0);
  };

  const contextValue = {
    food_list,
    addOrder,
    removeOrder,
    orderBy,
    setOrderBy,
    totale_price,
    token,
    setToken,
    filterData,
    seFilterData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
