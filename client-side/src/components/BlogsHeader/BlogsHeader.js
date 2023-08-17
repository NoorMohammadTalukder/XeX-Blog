import React from 'react';
import {useNavigate} from 'react-router-dom';
import "../../assets/css/common.css";
import "./BlogsHeader.css"
const BlogsHeader = () => {
    const navigate = useNavigate();
    return (
        <div className='head'>
            <div className='container'>
                <div className='pt1'>
                    <p className='font-weight-4 font-size-5 color-1'>XeX Blogs</p>
                    <button className='btn' onClick={()=>{ navigate('/login')}}>
                        <p className='font-weight-3 font-size-2 '>Login</p>
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default BlogsHeader;