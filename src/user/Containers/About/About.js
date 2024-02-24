import React from 'react';

function About(props) {
    return (
        <div>
            <section id="page-header" className="about-header">
                <h2>#KnowUs</h2>
                <p> Lorem ipsum dolor sit amet, consectetur </p>
            </section>

            <section id="about-head" className="section-p1">
                <img src="../assets/img/about/a6.jpg" alt />
                <div>
                    <h2>Who We Are?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris] nisi ut aliquip ex ea
                        commodo consequat. Duis auteirure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.</p>
                    <abbr tittle>Create stunnig images with as much or as little control as you like thanks to a choice of basic
                        and creative modes.</abbr>
                    <br /><br />
                    <marquee bgcolor="#ccc" loop={-1} scrollamount={5} width="100%">Create stunnig images with as much or as little
                        control as you like thanks to a choice of basic and creative modes.</marquee>
                </div>
            </section>

            <section id="about-app" className="section-p1">
                <h1>Download Our <a href="#">App</a></h1>
                <div className="video">
                    <video autoPlay muted loop src="../assets/img/about/1.mp4" />
                </div>
            </section>

            <section id="feature" className="section-p1">
                <div className="fe-box">
                    <img src="../assets/img/features/f1.png" alt />
                    <h6>Free Shipping</h6>
                </div>
                <div className="fe-box">
                    <img src="../assets/img/features/f2.png" alt />
                    <h6>Online Order</h6>
                </div>
                <div className="fe-box">
                    <img src="../assets/img/features/f3.png" alt />
                    <h6>Save Money</h6>
                </div>
                <div className="fe-box">
                    <img src="../assets/img/features/f4.png" alt />
                    <h6>Promotions</h6>
                </div>
                <div className="fe-box">
                    <img src="../assets/img/features/f5.png" alt />
                    <h6>xHappy Sell</h6>
                </div>
                <div className="fe-box">
                    <img src="../assets/img/features/f6.png" alt />
                    <h6>F24/7 Support</h6>
                </div>
            </section>
        </div>
    );
}

export default About;