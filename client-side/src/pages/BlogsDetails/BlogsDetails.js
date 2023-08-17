import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import jwt from "jwt-decode";
import "./BlogsDetails.css";

const BlogsDetails = () => {
  const [data, setData] = useState([]);
  const [dataComments, setDataComments] = useState([]);
  let { id } = useParams();
  const [decodedTokenId, setdecodedTokenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#36d7b7",
    paddingTop:"320px"
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = jwt(token); // Use jwtDecode function to decode token
        console.log(user.data._id);
        setdecodedTokenId(user.data._id);
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      const url = `https://xex-blog-render.onrender.com/api/v1/get-blog/${id}`;
      try {
        const res = await axios.get(url);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const url = `https://xex-blog-render.onrender.com/api/v1/get-comment-blog/${id}`;
      try {
        const res = await axios.get(url);
        console.log("Blogs");
        setDataComments(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("Updated dataComments:", dataComments);
  }, [dataComments]);

  const initialValues = {
    comment: "",
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required("Comment cannot be blank"),
  });

  const onSubmit = async (values, { resetForm }) => {
    // Handle form submission here
    const oldValue = {
      commenter_id: decodedTokenId,
      blog_id: id,
    };
    const mergedValues = {
      ...values,
      ...oldValue,
    };

    const url = `https://xex-blog-render.onrender.com/api/v1/create-comment`;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(url, mergedValues, {
        headers: {
          Token: `${token}`, // Include the token in the request headers
        },
      });

      const status = response.data.status;
      if (status === "success") {
        // Fetch the updated comments after posting the new comment
        const commentsUrl = `https://xex-blog-render.onrender.com/api/v1/get-comment-blog/${id}`;
        const commentsResponse = await axios.get(commentsUrl);
        setDataComments(commentsResponse.data.data);
        notifySuccess();
        console.log("commentsResponse");
        console.log(commentsResponse);
        resetForm();
      } else {
        notifyError("Something went wrong.Please login first");
      }
    } catch (error) {
      console.error(
        "Error posting comment or fetching updated comments:",
        error
      );
      notifyError("Something went wrong.Please login first");
    }
  };
  const notifySuccess = () => {
    toast.success("Your comment posted");
  };
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
      {loading ? (
        <HashLoader
          color="#36d7b7"
          loading={loading}
          cssOverride={override}
          size={"150px"}
          aria-label="Loading Spinner"
          data-testid="HashLoader"
        />
      ) : (
        <div className="details">
          <div className="details-pt-1">
            <p className="font-weight-4   font-size-3 color-1">{data.title}</p>
            <p className="font-weight-3   font-size-2 color-3">
              <b>Author: </b>
              {data.author}
            </p>
            <p className="font-weight-3   font-size-2 color-3">
              <b>Published Date: </b>
              {data.createdAt}
            </p>
            <p className="font-weight-3   font-size-2 story color-3">
              <b>Story:</b>
              {data.description}
            </p>
          </div>
          <div className="details-pt-2">
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form className="formComment">
                  <div className="formControl">
                    <p className="font-weight-3 font-size-3 color-1 write-comment">
                      Write Your Comments
                    </p>
                    <Field
                      type="text"
                      name="comment"
                      className="inputComment"
                    />
                    <ErrorMessage
                      name="comment"
                      component="div"
                      className="errorMessage"
                    />
                  </div>

                  <div className="btns">
                    <button type="submit" className="btnComment">
                      Comment
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>

            <div className="allcommnenst">
              <p className="font-size-3 font-weight-3 color-1">All Comments</p>
              {dataComments.length > 0
                ? dataComments?.map((item, index) => (
                    <div className="item" key={index}>
                      <p className="font-weight-4">{item.comment}</p>
                      <p className="font-size-2">--{item.commenter}</p>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsDetails;
