import styles from './signin.module.css';
import {NavLink} from 'react-router-dom';
import { useState } from 'react';

const canUserSignIn = (credentials) => {
    //fetching all the credentials from localStorage
    const storedCredentials = localStorage.getItem('credentials')?.json();
    console.log(storedCredentials);
    //checking each and every stored credentials in local storage
    storedCredentials.forEach((tempCredential)=>{
        if(tempCredential.email === credentials.email && tempCredential.password === credentials.password){
            return true;
        }
    });
    return false;
}

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailIsTouched, setEmailIsTouched] = useState(false);
    const [password, setPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState(false);

    const onEmailEnteredHandler = (event) => {
        setEmail(event.target.value);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
            console.log("valid");
            setEmailIsValid(true);
        }else{
            setEmailIsValid(false);
        }
    }

    const onPasswordEnteredHandler = (event) => {
        setPassword(event.target.value);
    }

    const onSigninHandler = (event) => {
        event.preventDefault();
        if(emailIsValid){
            console.log("login");
            const credentials = {
                email: email,
                password: password
            }
            if(canUserSignIn(credentials)){
                //login
            }else{
                //show toast msg
            }
        }
    }

    return <div className={styles['signin-container']}>
        <form className={styles['signin-form']} onSubmit={onSigninHandler}>
            <label for="email" className={styles['signin-label']}>Email</label>
            <input id="email" placeholder='Enter Email' type='email' className={styles['signin-input']} onChange={onEmailEnteredHandler} onBlur={()=>{setEmailIsTouched(true)}}/>
            {(!emailIsValid && emailIsTouched) && <div className={styles['signin-email-error']}>Enter valid Email</div>}
            <label for="password" className={styles['signin-label']}>Password</label>
            <input id="password" placeholder='Enter Password' type='password' className={styles['signin-input']} onChange={onPasswordEnteredHandler}/>
            <button className={styles['signin-btn']} type='submit'>Sign in</button>
            <NavLink className={styles['signup-link']}>Still not a member? SignUp</NavLink>
        </form>
    </div>
}

export default Signin;