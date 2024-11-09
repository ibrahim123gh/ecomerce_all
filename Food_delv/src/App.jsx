import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/Home";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Footer from "./components/footer/footer";
import Login from "./components/Login/Login";
import { useState } from "react";
import Card from "./components/Card/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/verify/verify";
import MyOrder from "./pages/myOrder/MyOrder";

function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? <Login setShow={setShow} /> : ""}
      <div className="app">
        <Navbar show={show} setShow={setShow} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/card" element={<Card />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myOrder" element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
