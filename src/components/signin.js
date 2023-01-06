import styles from './signin.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import { loginActions } from '../store/store';
import 'react-toastify/dist/ReactToastify.css';

const canUserSignIn = (credentials) => {

    //fetching all the credentials from localStorage
    const storedCredentials = JSON.parse(localStorage.getItem('userDetails')) || [];

    //flag variable to check whether user can login or not
    let login = false;

    //checking each and every stored credentials in local storage
    storedCredentials.forEach((tempCredential)=>{
        if(tempCredential.email === credentials.email && tempCredential.password === credentials.password){
            login = true;
        }
    });

    //if user can login then return true
    if(login){
        return true;
    }
    return false;
}

const Signin = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailIsTouched, setEmailIsTouched] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(()=>{
        //to clean the local storage login information
        localStorage.setItem('isLoggedIn', 'false');
    }, []);

    //this will be called when user will be entering email
    const onEmailEnteredHandler = (event) => {
        setEmail(event.target.value);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
            console.log("valid");
            setEmailIsValid(true);
        }else{
            setEmailIsValid(false);
        }
    }

    //this will be called when user will be entering password
    const onPasswordEnteredHandler = (event) => {
        setPassword(event.target.value);
    }

    //if user clicks on submit button
    const onSigninHandler = (event) => {
        event.preventDefault();
        if(emailIsValid){
            const credentials = {
                email: email,
                password: password
            }
            if(canUserSignIn(credentials)){
                //login
                dispatch(loginActions.login());
                localStorage.setItem("loggedInUser", email.trim());
                localStorage.setItem("isLoggedIn", 'true');
                toast.success("Logged in successfully!");
                if(email.trim().toLowerCase() === 'mayur@sarvadhi.com'){
                    localStorage.setItem('isAdmin', 'true');
                    navigate('/admin-dashboard',{replace: true});
                }else{
                    localStorage.setItem('isAdmin', 'false');
                    navigate('/dashboard',{replace: true});
                }
            }else{
                //show toast msg
                toast.error("Credentials doesn't matched!");
            }
        }
    }

    return <div className={styles['signin-container']}>
        <form className={styles['signin-form']} onSubmit={onSigninHandler}>

            <label htmlFor="email" className={styles['signin-label']}>Email</label>
            <input id="email" placeholder='Enter Email' type='email' className={styles['signin-input']} onChange={onEmailEnteredHandler} onBlur={()=>{setEmailIsTouched(true)}}/>
            {(!emailIsValid && emailIsTouched) && <div className={styles['signin-email-error']}>Enter valid Email</div>}

            <label htmlFor="password" className={styles['signin-label']}>Password</label>
            <input id="password" placeholder='Enter Password' type='password' className={styles['signin-input']} onChange={onPasswordEnteredHandler}/>

            <button className={styles['signin-btn']} type='submit'>Sign in</button>
            
            <NavLink to='/signup' className={styles['signup-link']}>Still not a member? SignUp</NavLink>
        </form>
    </div>
}

export default Signin;