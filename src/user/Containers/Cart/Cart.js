import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TitleBox from '../../UI/titlePart/TitleBox';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/button/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { decrementQuantity, incrementQuantity, removeItemFromCart } from '../../redux/action/cart.action';
import { setAlert } from '../../redux/slice/Alert.slice';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { NavLink } from 'react-router-dom';
import { addOrder } from '../../redux/slice/OrderSlice';
import { adduserInfoData, updateUserData } from '../../redux/slice/UserInfoSlice';
import { getProduct } from '../../redux/slice/Product.slice';

const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email('Invalid email address').required(),
    pincode: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    locality: Yup.string().required(),
    flat: Yup.string().required(),
    landmark: Yup.string().required(),
});

function Cart() {

    const product = useSelector((state) => state.product);
    const cartState = useSelector((state) => state.cart);
    const userState = useSelector((state) => state.auth);

    const [step, setStep] = useState(1);

    const dispatch = useDispatch();

    const stepper = [
        'Cart',
        'Billing Address',
        'Order Summary',
        'Confirmation'
    ];

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    let mediToCartData = cartState.items.map((cartItem) => {
        let filterData = product.product.find((medicine) => medicine.id === cartItem.pid);
        return { ...filterData, ...cartItem }
    })

    let totleAmount = mediToCartData.reduce((acc, val) => acc + parseInt(val.price) * val.quantity, 0);

    const items = mediToCartData.map((v) => ({
        productID: v.id,
        quantity: v.quantity,
    }));


    const quantityDecrement = (id) => {
        dispatch(decrementQuantity(id))
    }
    const quantityIncrement = (id) => {
        dispatch(incrementQuantity(id))
    }

    const removeFromCart = (id) => {
        let addedCartItem = product.product.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.name + ' cloth is successfully removed from cart', color: 'success' }))
        dispatch(removeItemFromCart(id));
    }

    const handleNextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };
    const handlePlaceOrder = (addressValues) => {
        const obj = {
            address: [addressValues],
            TotalAmount: totleAmount,
            userID: userState.user.uid,
            items: items
        }
        dispatch(addOrder(obj));
        setStep(4);
    };

    return (
        <div>
            <TitleBox
                titleText='Cart'
                subTitleText={[
                    'Welcome to cart. You can see here your added product. Thank you !!!'
                ]} />
            <Box sx={{ width: '80%', margin: '25px auto' }}>
                <Stepper activeStep={step - 1} alternativeLabel>
                    {stepper.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Formik
                initialValues={{ name: '', email: '', pincode: '', city: '', state: '', locality: '', flat: '', landmark: '', }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    handlePlaceOrder(values)
                }}
            >
                {({ isSubmitting, values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
                    <Form>
                        <div>
                            <section id="cart" className="section-p1">
                                {step === 1 && (
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>Image</td>
                                                    <td>Product</td>
                                                    <td>Price</td>
                                                    <td>Quantity</td>
                                                    <td>Subtotal</td>
                                                    <td>Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    mediToCartData.map((item) => {
                                                        return (
                                                            <tr>
                                                                <td><img src={item.prec} alt='' /></td>
                                                                <td>{item.name}</td>
                                                                <td>{item.price} ₹</td>

                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                    <Button classes='p-2 rounded-0' onClick={() => quantityDecrement(item.pid)}><RemoveIcon sx={{ fontSize: '20px' }} /></Button>
                                                                    <h5 style={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', lineHeight: '1.05', minWidth: '50px' }}
                                                                        className="fw-normal text-center mb-0  p-2">{item.quantity}</h5>
                                                                    <Button classes='p-2 rounded-0' onClick={() => quantityIncrement(item.pid)}><AddIcon sx={{ fontSize: '20px' }} /></Button>
                                                                </div>

                                                                <td>{item.quantity * item.price} ₹</td>
                                                                <td><Button onClick={() => removeFromCart(item.pid)} classes='p-0 bg-transparent'><CloseIcon sx={{ color: 'gray' }} /></Button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                        <div className='_3hTy6 _2G9H9'>
                                            <div className='_1X0c4'>
                                                <div role='none' id='cvd'>
                                                    <div className='_3lUMw'>
                                                        <div>
                                                            <span className='Text _2IwLF EZuNY _3FT_X '>
                                                                <strong>
                                                                    <span>Total Amount:  ₹</span>
                                                                    <span id='cart-order-total'> &nbsp;{totleAmount}</span>
                                                                </strong>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <section id="appointment" className="appointment">
                                        <form method="post" className="php-email-form">
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <input type="text" name="name" className="form-control" id="name" placeholder="Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" value={values.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <span className='form-errorCart'>{touched.name && errors.name ? errors.name : null}</span>
                                                </div>
                                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email" data-rule="email" data-msg="Please enter a valid email" value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <span className='form-errorCart'>{touched.email && errors.email ? errors.email : null}</span>
                                                </div>

                                                <div className="col-md-6 form-group">
                                                    <input type="number" name="pincode" className="form-control" id="pincode" placeholder="Pincode" maxLength={6} value={values.pincode}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <span className='form-errorCart'>{touched.pincode && errors.pincode ? errors.pincode : null}</span>
                                                </div>
                                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" className="form-control" name="city" id="city" placeholder="City" value={values.city}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <span className='form-errorCart'>{touched.city && errors.city ? errors.city : null}</span>
                                                </div>
                                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" className="form-control" name="state" id="state" placeholder="State" value={values.state}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <span className='form-errorCart'>{touched.state && errors.state ? errors.state : null}</span>
                                                </div>

                                                <div className="col-md-6 form-group">
                                                    <input type="text" name="locality" className="form-control" id="locality" placeholder="Locality / Area / Street" value={values.locality}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <span className='form-errorCart'>{touched.locality && errors.locality ? errors.locality : null}</span>
                                                </div>
                                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" className="form-control" name="flat" id="flat" placeholder="Flat no / Building Name" value={values.flat}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <span className='form-errorCart'>{touched.flat && errors.flat ? errors.flat : null}</span>
                                                </div>
                                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" className="form-control" name="landmark" id="landmark" placeholder="Landmark (Optional)" value={values.landmark}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <span className='form-errorCart'>{touched.landmark && errors.landmark ? errors.landmark : null}</span>
                                                </div>
                                            </div>
                                        </form>
                                    </section>
                                )}

                                {step === 3 && (
                                    <section id="doctors" className="doctors">
                                        <div className="container">
                                            <div className="add_card">
                                                <div className="row">
                                                    <div className="col-lg-8 cart">
                                                        <div className="title">
                                                            <div className="row">
                                                                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                                                                <div className="col align-self-center text-right text-muted">{mediToCartData.length} Item</div>
                                                            </div>
                                                        </div>
                                                        {
                                                            mediToCartData.map((v) => {
                                                                return (
                                                                    <div className="row borderBottom">
                                                                        <div className="row main align-items-center">
                                                                            <div className="col-2 cartImg"><img className='cart_img' src={v.prec} /></div>
                                                                            <div className="col">
                                                                                <div className="row text-muted">{v.name}</div>
                                                                            </div>
                                                                            <div className='col'>
                                                                                <div className="row">₹ &nbsp;{v.price}</div>
                                                                            </div>

                                                                            <div className='col'>
                                                                                <Button onClick={() => removeFromCart(v.pid)} classes='p-0 bg-transparent'><CloseIcon sx={{ color: 'gray' }} /></Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <NavLink to={'/shop'}><div className="back-to-shop">← &nbsp;<span className="text-muted">Back to shop</span></div></NavLink>
                                                    </div>

                                                    <div className="col-lg-4 summary">
                                                        <div className='orderH5'><h5><b>Order Details</b></h5></div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col" style={{ paddingLeft: '15px' }}>Bag Total</div>
                                                            <div className="col text-right">₹&nbsp; {totleAmount}</div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col" style={{ paddingLeft: '15px', paddingTop: '7px' }}>Delivery Charge</div>
                                                            <div className="col text-right" style={{ paddingTop: '7px', paddingBottom: '10px' }}>Free <small id='PRICE'>₹ &nbsp;99</small></div>
                                                        </div>

                                                        <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0', color: 'black', fontWeight: 'bold' }}>
                                                            <div className="col">Amount Payable:</div>
                                                            <div className="col text-right">₹&nbsp; {totleAmount}</div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col" style={{ paddingLeft: '15px', paddingTop: '15px', fontWeight: 'bold', color: 'black' }}>Return/Refund policy</div>
                                                        </div>
                                                        <div className="col text-right" style={{ paddingTop: '4px', paddingBottom: '10px' }}>&nbsp; In case of return, we ensure quick refunds. Full amount will be refunded excluding Convenience Fee</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {step === 4 && (
                                    <div id='successcard'>
                                        <div id="card-cart">
                                            <div style={{ borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto', marginTop: '-20px', marginBottom: '22px' }}>
                                                <i className="checkmark" id='i'>✓</i>
                                            </div>
                                            <h1 id='heading'>Order Placed!</h1>
                                            <p id='p'>Your Order Confirmed!! </p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    {step > 1 && step < 4 && (
                                        <div role='none' style={{ paddingLeft: '800px' }}>
                                            <button id='prev' className='_1Pr1m wQxKC _2fXFm _2zWIL' type='button' aria-label='Place Order' tabIndex={0}
                                                onClick={handlePreviousStep}
                                            >
                                                <span>
                                                    <strong>Previous</strong>
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                    {step < 3 && (

                                        <div role='none' style={{ paddingLeft: '1030px', marginTop: '-48px' }}>
                                            <button id='cpo' className='_1Pr1m wQxKC _2fXFm _2zWIL' type='button' aria-label='Place Order' tabIndex={0}
                                                onClick={handleNextStep}
                                                disabled={
                                                    (step === 1 &&
                                                        cartState.length === 0 ? true : false) ||
                                                        (step === 2 && (cartState.length === 0 || !values.name || !values.email || !values.pincode || !values.city || !values.state || !values.locality || !values.flat || !values.landmark))
                                                }
                                            >
                                                <span>
                                                    <strong>Proceed To Payment</strong>
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                    {step === 3 && (
                                        <div role='none' style={{ paddingLeft: '1030px', marginTop: '-48px' }}>
                                            <button id='submitted' className='_1Pr1m wQxKC _2fXFm _2zWIL' type='submit' disabled={isSubmitting}>
                                                <span>
                                                    <strong>Place Order</strong>
                                                </span>
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </section >
                        </div >
                    </Form >
                )
                }
            </Formik >
        </div >
    );
}

export default Cart;