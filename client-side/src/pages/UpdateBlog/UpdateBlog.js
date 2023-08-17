import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/common.css';
import './UpdateBlog.css';

const UpdateBlog = () => {
  const [data, setData] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#36d7b7",
    paddingTop: "320px"
  };
  useEffect(() => {
    (async () => {
      const url = `http://localhost:5010/api/v1/get-blog/${id}`;
      try {
        const res = await axios.get(url);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [id]);

  const initialValues = {
    title: data.title || '',
    description: data.description || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const onSubmit = (values) => {
    // Handle form submission here
    const oldValue = {
      "author_id": data.author_id,
      'createdAt': data.createdAt,
    }
    const mergedValues = {
      ...values,
      ...oldValue
    }
    console.log(mergedValues);
    const url = `https://xex-blog-render.onrender.com/api/v1/update-blog/${data._id}`
    const token = localStorage.getItem('token');
    axios.post(url, mergedValues, {
      headers: {
        'Token': `${token}` // Include the token in the request headers
      }
    })
      .then((response) => {
        const status = response.data.status;
        if (status === "success") {
          notifySuccess("Post updated")
        } else {
          notifyError("Something went wrong.Try gain later.")
        }
      })
      .catch((error) => {
        console.log("error")
        console.error(error);
        notifyError(error.response.data.status);
      });
  };
  const notifySuccess = () => {
    toast.success("Post updated");
    setTimeout(() => {
      navigate('/user-all-blogs');
    }, 3000);
  }
  const notifyError = (text) => toast.error(text);
  return (
    <div className="container">
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

      {
        loading ? 
        <HashLoader
          color="#36d7b7"
          loading={loading}
          cssOverride={override}
          size={"150px"}
          aria-label="Loading Spinner"
          data-testid="HashLoader"
        /> : 
        <div>
           {data && data.title && data.description ? (
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
                <p className="font-weight-3 font-size-2">Update</p>
              </button>
            </div>
          </Form>
        </Formik>
      ) : (
        ''
      )}
        </div>
      }
     
    </div>
  );
};

export default UpdateBlog;
