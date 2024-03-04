
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../user/components/Header/Header';
import Footer from '../user/components/Footer/Footer';

function UserRoutes(props) {
    return (
        <>
            <Header />
            <Routes>
                {/* <Route path="/" element={<Home />} />

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

                <Route path="/auth" element={<Auth />} /> */}
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;