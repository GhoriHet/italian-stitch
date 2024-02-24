
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from '../user/Containers/Shop/Shop';
import Home from "../user/Containers/Home/Home"
import Blog from '../user/Containers/Blog/Blog';
import About from '../user/Containers/About/About';
import Contact from '../user/Containers/Contact/Contact';
import Cart from '../user/Containers/Cart/Cart';
import Auth from '../user/Containers/Auth/Auth';
import Favourite from '../user/Containers/Favourite/Favourite';
import Header from '../user/components/Header/Header';
import Footer from '../user/components/Footer/Footer';
import PrivateRoutes from './PrivateRoutes';
import ShopParams from '../user/Containers/Shop/ShopParams';
import ShopDetail from '../user/Containers/Shop/ShopDetail';
import OrderAuth from '../user/Containers/OrderAuth/OrderAuth';
import ProductList from '../user/Containers/Fashion/ProductList';

function UserRoutes(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ShopParams />} />
                <Route path="/shopdetails/:id" element={<ShopDetail />} />
                <Route path="/product/:category_name/:id" element={<ProductList />} />

                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path='/orderauth' element={<OrderAuth />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/cart" element={<Cart />} />
                </Route>

                <Route path="/favourite" element={<Favourite />} />

                <Route path="/auth" element={<Auth />} />
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;