import styles from './signup.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function saveUserDetails(currentDetails){
    const userDetials = JSON.parse(localStorage.getItem('userDetails')) || [];
    let userExists = false;
    console.log(userDetials);
    userDetials.forEach((user)=>{
        if(user.email === currentDetails.email){
            console.log(user.email + " " + currentDetails.email);
            userExists = true;
        }
    });
    if(!userExists){
        userDetials.push(currentDetails);
        console.log(userDetials);
        localStorage.setItem("userDetails", JSON.stringify(userDetials));
        return true;
    }
    else
        return false;
}

const Signup = (props) => {
    const [name, setName] = useState('');
    const [nameIsValid, setNameIsValid] = useState('');
    const [nameIsTouched, setNameIsTouched] = useState(false);
    const [mobileNumber, setMobileNumber] = useState();
    const [mobileNumberIsValid, setMobileNumberIsValid] = useState();
    const [mobileNumberIsTouched, setMobileNumberIsTouched] = useState(false);
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailIsTouched, setEmailIsTouched] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [passwordIsTouched, setPasswordIsTouched] = useState(false);
    const [passwordsMatched, setPasswordsMatched] = useState(true);

    const navigate = useNavigate();

    const onNameEnteredHandler = (event) => {
        setNameIsTouched(true);
        setName(event.target.value.trim());
        if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(event.target.value)){
            setNameIsValid(true);
        }else{
            setNameIsValid(false);
        }
    }

    const onMobileNumberEntered = (event) => {
        setMobileNumberIsTouched(true);
        setMobileNumber(event.target.value);
        if(event.target.value.trim().length === 10){
            setMobileNumberIsValid(true);
        }else{
            setMobileNumberIsValid(false);
        }
    }

    const onEmailEnteredHandler = (event) => {
        setEmailIsTouched(true);
        setEmail(event.target.value);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
            console.log("valid");
            setEmailIsValid(true);
        }else{
            setEmailIsValid(false);
        }
    }

    const onPasswordEnteredHandler = (event) => {
        setPasswordIsTouched(true);
        setPassword(event.target.value);
        if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(event.target.value)){
            setPasswordIsValid(true);
        }else{
            setPasswordIsValid(false);
        }
    }

    const onConfirmPasswordEnteredHandler = (event) => {
        if(password === event.target.value){
            setPasswordsMatched(true);
        }else{
            setPasswordsMatched(false);
        }
    }

    const formReset = () => {
        setName('');
        setNameIsTouched(false);
        setNameIsValid(false);
        setMobileNumber('');
        setMobileNumberIsTouched(false);
        setMobileNumberIsValid(false);
        setEmail('');
        setEmailIsTouched(false);
        setEmailIsValid(false);
        setPassword();
        setMobileNumberIsTouched(false);
        setMobileNumberIsValid(false);
    }

    const onSignupHandler = (event) => {
        event.preventDefault();
        if(emailIsValid && passwordIsValid && mobileNumberIsValid && nameIsValid){
            console.log("signup");
            const userDetails = {
                name: name,
                mobile: mobileNumber,
                email: email,
                password: password,
                isAdmin: email === 'mayur@sarvadhi.com' ? true : false
            }
            if(saveUserDetails(userDetails)){
                //redirect to login page
                toast.success('User Details added successfully! Redirecting to Signin page.')
                formReset();
                navigate('/signin', {replace: true});
            }else{
                //show error
                toast.error(`User with ${email} already exists!`);
                console.log('user already exists');
            }
        }
    }

    return <div className={styles['signup-container']}>
        <form className={styles['signup-form']} onSubmit={onSignupHandler}>
            <label htmlFor='name' className={styles['signup-label']}>Name<span className={styles['required']}>*</span></label>
            <input id='name' placeholder='Enter Name' type='text' className={styles['signup-input']} onChange={onNameEnteredHandler} onBlur={()=>{setNameIsTouched(true)}}/>
            {(!nameIsValid && nameIsTouched) && <div className={styles['signup-error']}>Enter valid Name</div>}
            <label htmlFor='mobile' className={styles['signup-label']}>Mobile<span className={styles['required']}>*</span></label>
            <input id="mobile" placeholder='Enter Number' type='number' className={styles['signup-input']} onChange={onMobileNumberEntered} onBlur={()=>{setMobileNumberIsTouched(true)}}/>
            {(!mobileNumberIsValid && mobileNumberIsTouched) && <div className={styles['signup-error']}>Enter valid mobile number</div>}
            <label htmlFor="email" className={styles['signup-label']}>Email<span className={styles['required']}>*</span></label>
            <input id="email" placeholder='Enter Email' type='email' className={styles['signup-input']} onChange={onEmailEnteredHandler} onBlur={()=>{setEmailIsTouched(true)}}/>
            {(!emailIsValid && emailIsTouched) && <div className={styles['signup-error']}>Enter valid Email</div>}
            <label htmlFor="password" className={styles['signup-label']}>Password<span className={styles['required']}>*</span></label>
            <input id="password" placeholder='Enter Password' type='password' className={styles['signup-input']} onChange={onPasswordEnteredHandler} onBlur={()=>{setPasswordIsTouched(true)}}/>
            {(!passwordIsValid && passwordIsTouched) && <div className={styles['signup-error']}>Enter valid password</div>}
            <label htmlFor="confirm-password" className={styles['signup-label']}>Confirm Password<span className={styles['required']}>*</span></label>
            <input id="confirm-password" placeholder='Enter Password' type='password' className={styles['signup-input']} onChange={onConfirmPasswordEnteredHandler}/>
            {!passwordsMatched && <div className={styles['signup-error']}>Passwords doesn't match</div>}
            <button className={styles['signup-btn']} type='submit'>Sign up</button>
            <NavLink to='/signin' className={styles['signup-link']}>Signin?</NavLink>
        </form>
    </div>
}

export default Signup;