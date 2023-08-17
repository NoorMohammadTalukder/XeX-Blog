import React from 'react';
import jwt from 'jwt-decode';

import { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/css/common.css";
const CreateBlog = () => {
    const [decodedTokenId, setdecodedTokenId] = useState(null);
    const [decodedTokenName, setdecodedTokenName] = useState(null);
    // const [data, setData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = jwt(token); // Use jwtDecode function to decode token
                console.log(user.data._id)
                setdecodedTokenId(user.data._id);
                setdecodedTokenName(user.data.name);
            } catch (error) {
                console.error('Error decoding token:', error.message);
            }
        }
    }, []);

    const initialValues = {
        title: '',
        description: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });

    const onSubmit = (values) => {
        // Handle form submission here
        const oldValue={
           "author_id":decodedTokenId,
           'author':decodedTokenName,
        }
        const mergedValues={
            ...values,
            ...oldValue
        }
        const url=`https://xex-blog-render.onrender.com/api/v1/create-blog`;
        const token = localStorage.getItem('token');
        axios.post(url, mergedValues, {
            headers: {
                'Token': `${token}` // Include the token in the request headers
            }
        })
        .then((response) => {
            const status=response.data.status;
            // console.log(response.data)
            // const token=response.data.token;
            if(status==="success"){
                // localStorage.setItem("token",token)
                notifySuccess()
            }else{
                notifyError("Something went wrong");
            }
        })
        .catch((error) => {
            console.log("error")
            console.error(error);
            notifyError(error.response.data.status);
    
        });
      };
      const notifySuccess = () => {
        toast.success("Post Created");
        setTimeout(() => {
            navigate('/user-all-blogs');
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
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="formUpdate">
                    <div className="formControl">
                        <p className="font-weight-3 font-size-2">Title</p>
                        <Field
                            type="text"
                            name="title"
                            className="formInputTextUpdate inputUpdate"
                        />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className="errorMessage"
                        />
                    </div>

                    <div className="formControl">
                        <p className="font-weight-3 font-size-2">Description</p>
                        <Field
                            type="text"
                            name="description"
                            className="inputUpdate formInputTextArea"
                            as="textarea"
                        />
                        <ErrorMessage
                            name="description"
                            component="div"
                            className="errorMessage"
                        />
                    </div>

                    <div className="btns">
                        <button type="submit" className="btnSubmit">
                            <p className="font-weight-3 font-size-2">Post Blog</p>
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default CreateBlog;