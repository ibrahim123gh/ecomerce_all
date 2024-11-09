import { useState } from "react"
import ExplorOur from "../../components/ExplorOur/ExplorOur"
import Header from "../../components/header/Header"
import "./Home.css"
import Food from "../../components/food/food"
import AppDownload from "../../components/appDownload/AppDownload"

// eslint-disable-next-line react/prop-types
const Home = ({ tagreeb, setTagreeb }) => {
  const [category, setCategory] = useState("All");

  return (
    <div className="home">
      <Header />
      <ExplorOur category={category} setCategory={setCategory} />
      <Food category={category} tagreeb={tagreeb} setTagreeb={setTagreeb} />
      <AppDownload />
    </div>
  );
};

export default Home
