import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import Input from '../../UI/input/Input';
import TitleBox from '../../UI/titlePart/TitleBox';
import Button from '../../UI/button/Button';
import { forgotPassRequest, loginRequest, signupRequest } from '../../redux/action/auth.action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [formType, setFormType] = useState('login');
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const Auth = useSelector(state => state.auth)

    const handleSignup = (data) => {
        dispatch(signupRequest(data));
    }

    const handleLogin = (values) => {
        dispatch(loginRequest({
            data: values,
            callback: (route) => {
                navigate(route);
            }
        }));
    }

    const handleForgotPass = (data) => {
        dispatch(forgotPassRequest(data))
    }

    let validSchema = {};
    let initialVal = { name: '', email: '', password: '' };
    if (formType === 'login') {
        validSchema = {
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    'Must password have, Numbers , alphabets, and Special Character'
                )
        };
        initialVal = { email: '', password: '' };
    } else if (formType === 'signup') {
        validSchema = {
            name: Yup.string().min(2).required().matches(/^[A-Za-z ]+$/, 'Name must only contain characters.'),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    'Must password have, Numbers , alphabets, and Special Character'
                )
        };
        initialVal = { name: '', email: '', password: '' };
    } else if (formType === 'forgot') {
        validSchema = {
            email: Yup.string().email().required()
        };
        initialVal = { email: '' };
    }

    let authSchema = Yup.object(validSchema);
    const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        validationSchema: authSchema,
        initialValues: initialVal,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            if (formType === "login") {
                handleLogin(values)
            } else if (formType === "signup") {
                handleSignup(values);
            } else {
                handleForgotPass(values)
            }
            action.resetForm();
        }
    });

    return (
        <main>
            <div className="container">
                <div className="card">
                    <div className="card_title">
                        <TitleBox
                            titleText={formType === 'forgot' ? 'Forgot your password?' : formType === 'login' ? 'Login' : 'Signup'}
                            subTitleText={[
                                formType === 'forgot' ? (
                                    <>You can reset your password here. <br /> Please enter the email address you'd like your password reset information sent to</>
                                )
                                    : (<>
                                        Aenean enim orci, suscipit vitae sodales ac, semper in ex. <br /> Nunc aliquam eget nibh eu euismod. Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</>)
                            ]}
                        />
                        <div className="form">
                            <form onSubmit={handleSubmit} className="php-email-form">
                                {formType === 'signup' ? (
                                    <div className="col-md-12">
                                        <Input type="text" name="name" id="name" placeholder="Your Name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            errorText={errors.name && touched.name ? errors.name : null}
                                        />
                                    </div>
                                ) : null}
                                <div className="col-md-12">
                                    <Input type="email" name="email" id="email" placeholder="Email Address"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="username"
                                        errorText={errors.email && touched.email ? errors.email : null}
                                    />
                                </div>
                                {formType === 'forgot' ? null : (
                                    <div className="col-md-12">
                                        <Input type="password" name="password" id="password" placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete="current-password"
                                            errorText={errors.password && touched.password ? errors.password : null}
                                        />
                                    </div>
                                )}
                                <div className="row text-center justify-content-center g-4">
                                    <div className="col-md-12 mt-0 text-end fPassC">
                                        {formType === 'login' ? (<a href="#" onClick={() => setFormType('forgot')}> Forgot Password? </a>) : null}
                                    </div>
                                    <div className="col-md-12 my-4">
                                        {
                                            formType === "login" ?
                                                <Button type="submit">Login</Button>
                                                : formType === "signup" ?
                                                    <Button type="submit">Signup</Button>
                                                    : <Button type="submit">Request Reset Link</Button>
                                        }
                                    </div>
                                    <div className="col-md-12 linkStyC">
                                        <p>
                                            {
                                                formType === 'forgot' ?
                                                    <span>Back to<a href='#' onClick={() => setFormType('login')}> Login? </a></span>
                                                    : formType === 'login' ?
                                                        <span>Don't have an account? <a href='#' onClick={() => setFormType('signup')}> Signup </a></span>
                                                        :
                                                        <span>Already have an account? <a href='#' onClick={() => setFormType('login')}> Login </a></span>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}

export default Auth;