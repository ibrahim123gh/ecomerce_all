import { useContext, useEffect } from "react";
import "./verify.css";
import { StoreContext } from "../../components/StoreContext/StoreContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const { token } = useContext(StoreContext);
  const [search, setSearch] = useSearchParams();
  const succ = search.get("success");
  const orderId = search.get("orderId");
  const navigate = useNavigate();

  const verifyOrd = async () => {
    const responce = await axios.post(
      "http://localhost:4000/api/order/verify",
      { success: succ, orderId: orderId },
      { headers: { token } }
    );
    if(responce){
        navigate("/myorder");
    }
};
  useEffect(() => {
    verifyOrd();
  }, []);

  return <div className="verify">
    <div className="verify_ani"></div>
  </div>;
};

export default Verify;
