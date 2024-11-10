import Navbar from "./componentes/Navbar/Navbar";
import Sidebar from "./componentes/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Order/Order";
import "./all.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./pages/category/Category";
import GetCategory from "./pages/GetCategory/GetCategory";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const App = () => {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/category/list"
      );
      console.log(response.data.categ);
      setCategories(response.data.categ);
    } catch (error) {
      console.log(error);
    }
  };

    const removeItems = async (categoryId) => {
      try {
        const responce = await axios.delete(
          "http://localhost:4000/api/category/delete",
          { data: { id: categoryId } }
        );
        if (responce.data.success) {
          toast.success(responce.data.message);
          getCategory();
        }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="side_route">
        <ToastContainer />
        <Sidebar />
        <Routes>
          <Route
            path="/add"
            element={<Add categories={categories}  />}
          />
          <Route path="/list" element={<List />} />
          <Route path="/order" element={<Order  />} />
          <Route path="/category" element={<Category  />} />
          <Route
            path="/listCategory"
            element={
              <GetCategory categories={categories} removeItems={removeItems} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
