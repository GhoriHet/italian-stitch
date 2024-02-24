import React from 'react';

function Contact(props) {
    return (
        <div>
            <section id="page-header" className="about-header">
                <h2>#let's_talk</h2>
                <p> leave a messege , we love to hear from you! </p>
            </section>

            <section id="contact-details" className="section-p1 ">
                <div className="details">
                    <span>GET IN TOUCH </span>
                    <h2> visite one of our agency locations or contact us today</h2>
                    <h3> HEAD OFFICE</h3>
                    <div>
                        <li>
                            <i className="fa fa-map" />
                            <p>Sarthana Jakatnaka</p>
                        </li>
                        <li>
                            <i className="far fa-envelope" />
                            <p>Eshop@gmail.com</p>
                        </li>
                        <li>
                            <i className="fas fa-phone-alt" />
                            <p>Eshop@gmail.com</p>
                        </li>
                        <li>
                            <i className="far fa-clock " />
                            <p>Monday to stutrday 9:00 am to 16:00 pm</p>
                        </li>
                    </div>
                </div>
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.52982230402!2d72.82229625000001!3d21.15920015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1698339622351!5m2!1sen!2sin" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                </div>
            </section>

            <section id="form-details" className="section-p1">
                <form action>
                    <span> LEAVE A MESSEGE</span>
                    <h2> we love to hear from you</h2>
                    <input type="text" placeholder=" YOUR NAME" />
                    <input type="text" placeholder=" E-MAIL" />
                    <input type="text" placeholder=" SUBJECT" />
                    <textarea name id clos={30} rows={10} placeholder="your messege" defaultValue={""} />
                    <button className="normal">SUBMIT</button>
                </form>
                <div className="people">
                    <div>
                        <img src="../assets/img/people/1.png" alt />
                        <p>
                            <span> John doe</span>
                            senior marketing manager <br /> phone:01045673344<br /> E-mail:john@gmail.com
                        </p>
                    </div>
                    <div>
                        <img src="../assets/img/people/2.png" alt />
                        <p>
                            <span> William sam</span>
                            senior marketing manager <br /> phone:01099856445<br /> E-mail:william4@gmail.com
                        </p>
                    </div>
                    <div>
                        <img src="../assets/img/people/3.png" alt />
                        <p>
                            <span> Emma george </span>
                            senior marketing manager <br /> phone:01556782256<br /> E-mail:emmajoe@gmail.com
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;