import React, { Component } from "react";
import { signUp } from '../../../utilities/users-services'
import "./SignUpForm.css"

export default class SignUpModal extends Component {
    state = {
        email: '',
        password: '',
        confirm: '',
        error: '',
        isOpen: false
    }

    openModal = () => {
        this.setState({ isOpen: true });
        this.props.setSignUpModal('none')
    }

    closeModal = () => {
        this.setState({
            email: '',
            password: '',
            confirm: '',
            error: '',
            isOpen: false
        });
        this.props.setSignUpModal('')
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            error: ''
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const formData = { ...this.state }
            delete formData.error
            const user = await signUp(formData)
            this.props.setUser(user)
            this.closeModal();
        } catch (error) {
            console.error(error)
            this.setState({
                error: 'Sign up failed - try again later'
            })
        }
    }

    render() {
        let signUpForm = this.state.isOpen;
        const disable = this.state.password !== this.state.confirm;
        
        //SWAPPING TEXT OPEN/CLOSE FUNCTIONALITY ON LOGIN PAGE
        function signInMessages(openSignUp, closeSignUp) {
            if (!signUpForm) {
                return openSignUp
            }
            else {
                return closeSignUp
            }
        }
        
        return (
            <div className="sign-up-container">
                <span>{signInMessages('New Here? Sign up to Register!', 'Already have an Account?')}</span>&nbsp;
                <button className="openModal"
                    onClick={signInMessages(this.openModal, this.closeModal)}>{signInMessages('Sign Up', 'Sign In')}</button>
                {this.state.isOpen && (
                    <div className="modal">
                        <SignUpForm
                            email={this.state.email}
                            password={this.state.password}
                            confirm={this.state.confirm}
                            error={this.state.error}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            disable={disable}
                        />
                    </div>
                )}
            </div>
        )
    }
}

function SignUpForm(props) {
    return (
        <div className='form-container'>
            <form autoComplete='off' onSubmit={props.handleSubmit}>
            
                <label className='signup-labels'>Email</label>
                <input
                    type='email'
                    name='email'
                    value={props.email}
                    onChange={props.handleChange}
                    required
                />
                <label className='signup-labels'>Password</label>
                <input
                    type='password'
                    name='password'
                    value={props.password}
                    onChange={props.handleChange}
                    required
                />
                <label className='signup-labels'>Confirm</label>
                <input
                    type='password'
                    name='confirm'
                    value={props.confirm}
                    onChange={props.handleChange}
                    required
                />
                <button className="sign-up-button" type='submit' disabled={props.disable}>Sign Up</button>
            </form>
            <p className='error-message'>{props.error}</p>
        </div>
    )
}
