import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/css/common.css";
import "./Registration.css"

const Registration = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
        name: ""
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        name: Yup.string().required('Name is required'),
    });
    const onSubmit = (values) => {
        axios.post("https://xex-blog-render.onrender.com/api/v1//registration", values)
            .then((response) => {
                const status = response.data.status;
                if (status === "success") {
                    // localStorage.setItem("token",token)
                    notifySuccess();
                }
                if (status === "fail") {
                    // localStorage.setItem("token",token)
                    notifyError("Username taken");
                }
            })
            .catch((error) => {
                console.log("error")
                console.error(error);
                notifyError("Something went wrong. Try gain later.");
                // notifyError(error.response.data.message);

            });
    };
    const notifySuccess = () => {
        toast.success("Registered");
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    }
    const notifyError = (text) => toast.error(text);
    return (
        <div className='container'>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='registration-container'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="form" >
                        <p className='font-size-4 font-weight-4'>Register</p>
                        <div className="formControl">
                            <p className='font-weight-3 font-size-2'>Name</p>
                            <Field
                                type="text"
                                name="name"
                                className="formInputText input"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="errorMessage" />
                        </div>
                        <div className="formControl">
                            <p className='font-weight-3 font-size-2'>Username</p>
                            <Field
                                type="text"
                                name="username"
                                className="formInputText input"
                            />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="errorMessage" />
                        </div>

                        <div className="formControl">
                            <p className='font-weight-3 font-size-2'>Password</p>
                            <Field
                                type="text"
                                name="password"
                                className="formInputText input"

                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="errorMessage"
                            />
                        </div>

                        <div className='btns'>
                            <button type="submit" className='btnSubmit'><p className='font-weight-3 font-size-2'>Register</p></button>
                        </div>
                        <p className='font-weight-2 font-size-2 register'><span onClick={() => { navigate("/login") }}>Login here</span></p>

                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Registration;