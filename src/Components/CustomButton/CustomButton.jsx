import React from 'react';
import './CustomButton.scss';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
  return (
        <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} customButton`} {...otherProps} >
          {children}
        </button>
  )
}

export default CustomButton