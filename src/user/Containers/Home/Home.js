import React from 'react';

function Home(props) {
    return (
        <div>
            <section id="hero">
                <h4>Trade-in-offer</h4>
                <h2>Super value deals</h2>
                <h1>On all products</h1>
                <p>Save more with coupons &amp; up to 70% off!</p>
                <button>Shop Now</button>
            </section>
            {/* <section id="feature" className="section-p1">
                <div className="fe-box">
                    <img src="assets/img/features/f1.png" alt />
                    <h6>Free Shipping</h6>
                </div>
                <div className="fe-box">
                    <img src="assets/img/features/f2.png" alt />
                    <h6>Online Order</h6>
                </div>
                <div className="fe-box">
                    <img src="assets/img/features/f3.png" alt />
                    <h6>Save Money</h6>
                </div>
                <div className="fe-box">
                    <img src="assets/img/features/f4.png" alt />
                    <h6>Promotions</h6>
                </div>
                <div className="fe-box">
                    <img src="assets/img/features/f5.png" alt />
                    <h6>Happy Sell</h6>
                </div>
                <div className="fe-box">
                    <img src="assets/img/features/f6.png" alt />
                    <h6>F24/7 Support</h6>
                </div>
            </section>
            <section id="product1" className="section-p1">
                <h2>Featured Products</h2>
                <p className="heading">Summer Collection New Modern Design</p>
                <a href='../shop'>
                    <div className="pro-container">
                        <div className="pro">
                            <img src=" assets/img/Men/shirts/s9.png" alt='' />
                            <div className="des">
                                <span>THE BEAR HOUSE</span>
                                <h5>Men Checked Slim Fit Shirt</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                </div>
                                <h4>1,248 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/shirts/s2.png" alt />
                            <div className="des">
                                <span>WUXI</span>
                                <h5>Cuban Collar Shirt with Shoert Sleeves</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                </div>
                                <h4>480 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/shirts/s3.png" alt />
                            <div className="des">
                                <span>WUXI</span>
                                <h5>Cuban Collar Shirt with Shoert Sleeves</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>480 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/shirts/s4.png" alt />
                            <div className="des">
                                <span>BRITISH CLUB</span>
                                <h5>Checked Slim Fit Flannel Shirt</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>923 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/shirts/s5.png" alt />
                            <div className="des">
                                <span>URBAN BUCCACHI</span>
                                <h5>Men Striped Regular Fit Shirt</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>483 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/shirts/s6.png" alt />
                            <div className="des">
                                <span>WRANGLER</span>
                                <h5> Checked Slim Fit Shirt</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                </div>
                                <h4>2,799 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/shirts/s7.png" alt />
                            <div className="des">
                                <span>URBAN BUCCACHI</span>
                                <h5>Men Striped Regular Fit Shirt</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>483 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/shirts/s8.png" alt />
                            <div className="des">
                                <span>JAINISH</span>
                                <h5>Spread-Collar Shirt with Patch Pocket </h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-regular fa-star" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>782 ₹</h4>
                            </div>
                        </div>
                    </div>
                </a>
            </section >
            <section id="banner" className="section-m1">
                <h4>Repair Services</h4>
                <h2>Up to <span>70% off</span> - All T-shirts &amp; Accessories</h2>
                <button className="normal">Explore More</button>
            </section>

            <section id="product1" className="section-p1">
                <h2>New Arrivals</h2>
                <p className="heading">Summer Collection New Modern Design</p>
                <a href='../shop'>
                    <div className="pro-container">
                        <div className="pro">
                            <img src="assets/img/Men/track/track1.png" alt />
                            <div className="des">
                                <span>TEAMSPIRIT</span>
                                <h5>Men Track Pants with Contrast Panel</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>892 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/track/track2.png" alt />
                            <div className="des">
                                <span>TEAMSPIRIT</span>
                                <h5>Men Track Pants with Insert Pockets</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-regular fa-star" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>479 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/track/track3.png" alt />
                            <div className="des">
                                <span>TEAMSPIRIT</span>
                                <h5>Men Straight Fit Track Pants</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                </div>
                                <h4>999 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/track/track4.png" alt />
                            <div className="des">
                                <span>GLOBAL REPUBLIC</span>
                                <h5>Men Track Pants with Drawstring Waist</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>1,259 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/trouser/TP6.png" alt />
                            <div className="des">
                                <span>JOHN PLAYERS</span>
                                <h5>Slim Fit Flat-Front Trousers</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                </div>
                                <h4>1,500 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/trouser/TP2.png" alt />
                            <div className="des">
                                <span>BRITISH CLUB</span>
                                <h5>Cargo Jogger Pants with Drawstring Waist</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-regular fa-star" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>1,320 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/trouser/TP3.png" alt />
                            <div className="des">
                                <span>NETPLAY</span>
                                <h5>Mid-Rise Flat-Front Slim Fit Chinos</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-solid fa-star-half-stroke" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>1,499 ₹</h4>
                            </div>
                        </div>
                        <div className="pro">
                            <img src="assets/img/Men/trouser/TP4.png" alt />
                            <div className="des">
                                <span>BENE KLEED</span>
                                <h5>Straight Fit Flat-Front Cargo Pants</h5>
                                <div className="star">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fa-regular fa-star" />
                                    <i className="fa-regular fa-star" />
                                </div>
                                <h4>1,559 ₹</h4>
                            </div>
                        </div>
                    </div>
                </a>
                <section id="sm-banner" className="section-p1">
                    <div className="banner-box">
                        <div className="overlay" />
                        <div className="banner-content content">
                            <h4>Crazy Deals</h4>
                            <h2>Buy 1 Get 1 Free</h2>
                            <span>The best classic dress is on sale at cara</span>
                            <button className="white">Learn More</button>
                        </div>
                    </div>
                    <div className="banner-box">
                        <div className="overlay" />
                        <div className="banner-content content">
                            <h4>Spring/Summer </h4>
                            <h2>Upcoming Season</h2>
                            <span>The best classic dress is on sale at cara</span>
                            <button className="white">Collection</button>
                        </div>
                    </div>
                </section>
                <section id="banner3" className="section-p1">
                    <div className="banner-box">
                        <div className="overlay" />
                        <div className="content">
                            <h2> Seasonal Sale</h2>
                            <h3>Winter Collection 50% Off</h3>
                        </div>
                    </div>
                    <div className="banner-box">
                        <div className="overlay" />
                        <div className="content">
                            <h2> Elegant Collection</h2>
                            <h3>Elegant collection with special prices</h3>
                        </div>
                    </div>
                    <div className="banner-box">
                        <div className="overlay" />
                        <div className="content">
                            <h2>New Women Collection</h2>
                            <h3>New Summer Collection For Women </h3>
                        </div>
                    </div>
                </section>
            </section> */}
        </div >
    );
}

export default Home;