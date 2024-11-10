/* eslint-disable react/prop-types */
import "./GetCategory.css";

const GetCategory = ({ categories, removeItems }) => {
  return (
    <div className="list_admin">
      <h3>All Category</h3>
      <div className="head_categ title_list">
        <b>Image</b>
        <b>Name Category</b>
        <b>Description</b>
        <b>close</b>
      </div>
      {categories.map((item, index) => {
        return (
          <div className="head_categ body_list" key={index}>
            <p>
              <img src={`http://localhost:4000/images/` + item.image} alt="" />
            </p>
            <p>{item.name}</p>
            <p>{item.description}</p>
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

export default GetCategory;
