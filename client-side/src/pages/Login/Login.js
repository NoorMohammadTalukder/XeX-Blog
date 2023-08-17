import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/css/common.css";
import "./Login.css"

const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: "testuser",
        password: "Test123",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('username is required'),
        password: Yup.string().required('password is required'),
    });
    const onSubmit = (values) => {

        axios.post("https://xex-blog-render.onrender.com/api/v1//login", values)
            .then((response) => {
                const status = response.data.status;
                const token = response.data.token;
                if (status === "success") {
                    localStorage.setItem("token", token)
                    navigate('/user-all-blogs')
                }else{
                    notifyError("Invalid credentials")
                }
            })
            .catch((error) => {
                console.log("error")
                console.error(error);
                notifyError(error.response.data)
                // notifyError(error.response.data.message);

            });
    };

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
            <div className='login-container'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="form" >
                        <p className='font-size-4 font-weight-4'>Login</p>
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
                            <button type="submit" className='btnSubmit'><p className='font-weight-3 font-size-2'>Login</p></button>
                        </div>
                        <p className='font-weight-2 font-size-2 register'><span onClick={() => { navigate("/registration") }}>Register here</span></p>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;