import React, { useState, useEffect } from 'react';
import BlogsHeader from '../../components/BlogsHeader/BlogsHeader';
import axios from 'axios';
import { ErrorMessage, FastField, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HashLoader  from 'react-spinners/HashLoader';
import "../../assets/css/common.css";
import "./AllBlogs.css"

const AllBlogs = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#36d7b7",
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("https://xex-blog-render.onrender.com/api/v1/get-blog");
                console.log(res.data.data);
                setData(res.data.data);
                setLoading(false); // Data is loaded, set loading to false
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

    const initialValues = {
        author: "",
    };

    const validationSchema = Yup.object({
        author: Yup.string().required('Search input cannot be blank'),
    });
    const onSubmit = (values) => {
       setLoading(true)
        axios.post("https://xex-blog-render.onrender.com/api/v1/search-blog", values)
            .then((response) => {
                const status = response.data.status;
                if (status === "success") {
                    setLoading(false)
                    if (response.data.data.length !== 0) {
                        setData(response.data.data);
                    } else {
                        setData([])
                    }

                }
            })
            .catch((error) => {
                console.log("error")
                console.error(error);
                // notifyError(error.response.data.message);

            });
    }
    const notifySuccess = () => {
        toast.success("Post Created");
        setTimeout(() => {
            navigate('/user-all-blogs');
        }, 3000);
    }
    const notifyError = (text) => toast.error(text);
    return (
        <div>
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
            <BlogsHeader></BlogsHeader>
            <div className='container'>
                <div className='container-search'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className="formSearch" >
                            <div className="formControlsearch">
                                <Field
                                    type="text"
                                    name="author"
                                    className="inputSearch"
                                    placeholder="Search by author name"
                                />
                                <ErrorMessage
                                    name="author"
                                    component="div"
                                    className="errorMessage" />
                            </div>

                            <div className='btnsSearch'>
                                <button type="submit" className='btnSearch'>Search</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div >
                    {loading ? (
                        <div className='spinner-container'>
                            <HashLoader 
                                color="#36d7b7"
                                loading={loading}
                                cssOverride={override}
                                size={"150px"}
                                aria-label="Loading Spinner"
                                data-testid="HashLoader"
                            />
                        </div>
                    ) : (
                        data.length !== 0 ? (
                            <div className='grid-container'>
                                {
                                    data.map((item, index) => (
                                        <div className='grid-item' key={index}>
                                            <p className='font-weight-3 font-size-3 color-2 mb'>
                                                {item.title.length > 10
                                                    ? `${item.title.substring(0, 10)}...`
                                                    : item.title}
                                            </p>
                                            <p className='font-weight-2 font-size-1 mt'><b>Author:</b> {item.author}</p>
                                            <p className='font-weight-2 font-size-2'>{item.description.length > 200
                                                ? `${item.description.substring(0, 200)}...`
                                                : item.description}
                                            </p>
                                            <p className='font-size-1 font-weight-2 read' onClick={() => { navigate(`/blogs-details/${item._id}`) }}><span>Read Full Blogs</span></p>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div>
                                <p>No blogs found.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllBlogs;
