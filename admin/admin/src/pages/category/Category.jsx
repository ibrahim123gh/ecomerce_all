import { useState } from "react";
import upload from "../../assets/upload.png";
import "./category.css";
import axios from "axios";
import { toast } from "react-toastify";

const Category = () => {
  const [imgCat, setImgCta] = useState(false);

  const [categories, setCategories] = useState({
    name: "",
    description: "",
  });

  const handle = (e) => {
    setCategories({ ...categories, [e.target.name]: e.target.value });
  };

  const handleInput = async (e) => {
    e.preventDefault();

    if (imgCat) {
      const formData = new FormData();
      formData.append("image", imgCat);
      formData.append("name", categories.name);
      formData.append("description", categories.description);
      try {
        const responce = await axios.post(
          "http://localhost:4000/api/category/add",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (responce.data.success) {
          console.log(responce);
          toast.success(responce.data.message);
          setCategories({
            name: "",
            description: "",
          });
          setImgCta(false);
        } else {
          toast.error(responce.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("error");
      }
    }else{
      toast.error("Please select an image")
    }
  };

  return (
    <div className="category">
      <h2>Add Category</h2>
      <div className="category_info">
        <form onSubmit={handleInput}>
          <div className="image_upload bot">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={imgCat ? URL.createObjectURL(imgCat) : upload} alt="" />
            </label>
            <input
              onChange={(e) => setImgCta(e.target.files[0])}
              type="file"
              name="image"
              id="image"
              hidden
              required
            />
          </div>
          <div className="add_inp bot">
            <p>Category Name</p>
            <input
              type="text"
              onChange={handle}
              value={categories.name}
              placeholder="Type Here"
              name="name"
              required
            />
          </div>
          <div className="add_inp bot">
            <p>Category description</p>
            <textarea
              onChange={handle}
              value={categories.description}
              name="description"
              placeholder="Write content here"
            ></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Category;
