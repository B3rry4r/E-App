import React from 'react';
import './SignIn.scss';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import { signInWithGoogle } from '../../Firebase/Firebase.utils';


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

    }
    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: '', password: '' })
    }
    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='signIn'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} type="text" name='email' value={this.state.email} required label='Email' />
                    <FormInput handleChange={this.handleChange} type="password" name='password' value={this.state.password} required label='Password' />
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn