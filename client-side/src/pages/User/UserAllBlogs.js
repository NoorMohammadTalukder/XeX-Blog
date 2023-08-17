import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import HashLoader from 'react-spinners/HashLoader';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/css/common.css";
import "./UserAllBlogs.css"

const UserAllBlogs = () => {
    const [decodedTokenId, setdecodedTokenId] = useState(null);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#36d7b7",
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = jwt(token); // Use jwtDecode function to decode token
                console.log(user.data._id)
                setdecodedTokenId(user.data._id);

            } catch (error) {
                console.error('Error decoding token:', error.message);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const URL = `https://xex-blog-render.onrender.com/api/v1/get-blog-author/${decodedTokenId}`;
                const token = localStorage.getItem('token');
                const response = await axios.get(URL, {
                    headers: {
                        'Token': `${token}` // Include the token in the request headers
                    }
                });
                setData(response.data.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (decodedTokenId) {
            fetchData();
        }
    }, [decodedTokenId, data]);

    const postDelete = async (id) => {
        try {
            const URL = `https://xex-blog-render.onrender.com/api/v1/delete-blog/${id}`;
            const token = localStorage.getItem('token');
            const response = await axios.get(URL, {
                headers: {
                    'Token': `${token}` // Include the token in the request headers
                }
            });
            console.log(response)
            if(response.data.status==="success"){
                notifySuccess("Post deleted")
            }else{
                notifyError("Something went wrong")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            notifyError(error.response.data.status)
        }
    }
    const notifySuccess = (text) => {
        toast.success(text);
       
      }
      const notifyError = (text) => toast.error(text);
    return (
        <>
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
            <ProfileHeader></ProfileHeader>
            {
                loading ? <HashLoader
                    color="#36d7b7"
                    loading={loading}
                    cssOverride={override}
                    size={"150px"}
                    aria-label="Loading Spinner"
                    data-testid="HashLoader"
                /> : <div className='container'>
                    <table>
                        <thead>
                            <tr>
                                <th >
                                    <p className='font-weight-4   font-size-3'>SL</p>
                                </th>
                                <th >
                                    <p className='font-weight-4   font-size-3'> Blog Title</p>
                                </th>
                                <th >
                                    <p className='font-weight-4   font-size-3'> Actions</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add your table rows here */}
                            {data.map((item, index) => (
                                <tr className='tr' key={index} >
                                    <td><p className='font-weight-4  font-size-2'>{index + 1}</p></td>
                                    <td className=''><p className='font-weight-4  font-size-2'>{item.title}</p></td>
                                    <td>
                                        <button className='btnDetails' onClick={() => { navigate(`/blogs-details/${item._id}`) }}>Details</button>
                                        <button className='btnUpdate' onClick={() => { navigate(`/blogs-update/${item._id}`) }}>Update</button>
                                        <button className='btnDelete' onClick={() => { postDelete(item._id) }}>Delete</button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>

                </div>
            }

            {/* <div className='container'>
                <table>
                    <thead>
                        <tr>
                            <th >
                                <p className='font-weight-4   font-size-3'>SL</p>
                            </th>
                            <th >
                                <p className='font-weight-4   font-size-3'> Blog Title</p>
                            </th>
                            <th >
                                <p className='font-weight-4   font-size-3'> Actions</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr className='tr' key={index} >
                                <td><p className='font-weight-4  font-size-2'>{index + 1}</p></td>
                                <td className=''><p className='font-weight-4  font-size-2'>{item.title}</p></td>
                                <td>
                                    <button className='btnDetails' onClick={() => { navigate(`/blogs-details/${item._id}`) }}>Details</button>
                                    <button className='btnUpdate' onClick={() => { navigate(`/blogs-update/${item._id}`) }}>Update</button>
                                    <button className='btnDelete' onClick={() => { postDelete(item._id) }}>Delete</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div> */}
        </>
    );
};

export default UserAllBlogs;
