import React from 'react';
import {useNavigate} from 'react-router-dom';
import "../../assets/css/common.css";
import "./ProfileHeader.css"
const ProfileHeader = () => {
        const navigate = useNavigate();
    return (
        <div>
        <div className='container'>
            <div className='pt1'>
                <p className='font-weight-4 font-size-5 color-1'>XeX Blogs</p>
                <button className='btnPost' onClick={()=>{ navigate('/create-blog')}}>
                    Post a blog
                </button>
            </div>
            
        </div>
    </div>
    );
};

export default ProfileHeader;