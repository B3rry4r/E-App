import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../Assets/crown.svg';
import { auth } from '../../Firebase/Firebase.utils';
import { signOut } from "firebase/auth";


const Header = ({ currentUser }) => {
    return (
        <div className='header'>
            <Link className='logoContainer' to='/'>
                <Logo className='logo' />
            </Link>

            <div className="options">
                <Link className='option' to='/shop' >
                    SHOP
                </Link>
                <Link className='option' to='/shop' >
                    CONTACT
                </Link>
                {
                    currentUser ? 
                    <div className='option' onClick={() => signOut(auth).then(()=>{console.log('successfull');}).catch((e) => {'error'})} >SIGN OUT</div>
                    :
                    <Link className='option' to='/sign-in' >SIGN IN</Link>
                }
            </div>
        </div>
    )
}

export default Header