import React from "react";
import LayOut from "../Admin/components/Lay_out.js/LayOut";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Admin/conatiner/Dashboard/Dashboard";
import Order from "../Admin/conatiner/Order/Order";
import OrderDetails from "../Admin/conatiner/Order/OrderDetails";
import Product from "../Admin/conatiner/Product/Product";
import Category from "../Admin/conatiner/Category/Category";
import Subcategory from "../Admin/conatiner/Subcategory/Subcategory";

function AdminRoutes(props) {
    return (
        <LayOut>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route exact path='/category' element={<Category />} />
                <Route exact path='/subcategory' element={<Subcategory />} />
                <Route exact path='/product' element={<Product />} />
                <Route exact path='/order' element={<Order />} />
                <Route exact path="/order/orderdetails/:id" element={<OrderDetails />} />
            </Routes>
        </LayOut>
    );
}

export default AdminRoutes;