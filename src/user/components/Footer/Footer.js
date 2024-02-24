import React from 'react';

function Footer(props) {
    return (
        <footer className="section-p1">
            <div className="col">
                <div className='logo'>
                    {/* <img src="../assets/img/shopify_logo.png" alt className="logo" /> */}
                </div>
                <h4>Contact</h4>
                <p><strong>Address:</strong> Delhi,India </p>
                <p><strong>Phone:</strong> <a href="#"> +91 9988776655</a> </p>
                <p><strong>Hours:</strong> 10:00AM - 05:00PM, Monday - Saturday </p>
            </div>
            <div className="col">
                <h4>About</h4>
                <a href="#">About Us</a>
                <a href="#">Delivery Information</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms &amp; Conditions</a>
                <a href="#">Contact Us</a>
            </div>
            <div className="col">
                <h4>My Account</h4>
                <a href="#">Sign In</a>
                <a href="#">View Cart</a>
                <a href="#">My Wishlist</a>
                <a href="#">Track My Order</a>
                <a href="#">Help</a>
            </div>
            <div className="col install">
                <h4>Payments</h4>
                <p>Secured Payment Gateways</p>
                <img src="../assets/img/pay/pay.png" alt />
            </div>
            <div className="copyright">
                <p>© 2022, Web Development Project - Group </p>
            </div>
        </footer>
    );
}

export default Footer;