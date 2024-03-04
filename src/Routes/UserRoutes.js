
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../user/components/Header/Header';
import Home from '../user/container/Home';
import Footer from '../user/components/Footer/Footer';
import Shop from '../user/container/Shop/Shop';
import About from '../user/container/About';
import Contact from '../user/container/Contact';
import Cart from '../user/container/Cart';
// import PrivateRoutes from './PrivateRoutes';

function UserRoutes(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* <Route element={<PrivateRoutes />}> */}
                    <Route path="/cart" element={<Cart />} />
                {/* </Route> */}

                {/* <Route path="/shop" element={<Shop />} />
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

                <Route path="/auth" element={<Auth />} /> */}
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;