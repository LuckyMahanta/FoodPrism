import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "./AllProduct";
// import { addCartItem } from "../redux/ProductSlide";

const Menu = () => {

  return (
    <div className='pt-24'>
         <div className="p-3 xl:p-4">
        <AllProduct heading={"Menu"}/>
    </div>
    </div>
   
  );
};

export default Menu;