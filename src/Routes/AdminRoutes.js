import React from "react";
import LayOut from "../Admin/components/Lay_out.js/LayOut";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Admin/conatiner/Dashboard/Dashboard";
import ClothCat from '../Admin/conatiner/Category/ClothCat';
import SubCategory from "../Admin/conatiner/SubCategory/SubCategory"
import ClothCategory from "../Admin/conatiner/ClothCategory/ClothCategory";
import Order from "../Admin/conatiner/Order/Order";
import OrderDetails from "../Admin/conatiner/Order/OrderDetails";

function AdminRoutes(props) {
    return (
        <LayOut>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route exact path='/ClothCat' element={<ClothCat />} />
                <Route exact path='/subcategory' element={<SubCategory />} />
                <Route exact path='/clothCategory' element={<ClothCategory />} />
                <Route exact path='/order' element={<Order />} />
                <Route exact path="/order/orderdetails/:id" element={<OrderDetails />} />
            </Routes>
        </LayOut>
    );
}

export default AdminRoutes;