import React from 'react';
import './SocialMediaIcon.css';

const SocialMediaIcon = ({ iconClass, title, description, link }) => {
    return (
        <div className='icon-container'>
            <i className={iconClass}></i>
            <div className='icon-text'>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={link}>Learn more</a>
            </div>
        </div>
    );
};

export default SocialMediaIcon;
