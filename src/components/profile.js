import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/store';
import styles from './profile.module.css';

const getUserDetails = () => {
    return JSON.parse(localStorage.getItem('loggedInUserDetails'));
}

const Profile = (props) => {
    const user = useMemo(()=>{
        return getUserDetails();
    }, []);
    const [newName, setNewName] = useState(user.name);
    //this is a profile page where user will get to see all the profile details
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //this will get hit when user wants to logout
    const onLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        dispatch(loginActions.logout());
        navigate('/signin', {replace: true});
    }

    const editDetails = () => {
        user.name = newName;
        localStorage.setItem('loggedInUserDetails', JSON.stringify(user))
        //to get the user details from local storage
        let userDetails = JSON.parse(localStorage.getItem('userDetails'));
        userDetails.forEach((tempUser, index)=>{
            if(tempUser.email === user.email){
                userDetails[index].name = newName;
            }
        });
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }

    const nameChangedHandler = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    }
    
    return <div className={styles['profile-container']}>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' value={newName} onChange={nameChangedHandler}/>
        <label htmlFor='number'>Number</label>
        <input id='number' type='number' value={user.mobile} disabled={true}/>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' value={user.email} disabled={true}/>
        <button onClick={editDetails}>Edit</button>
        <button onClick={onLogout}>Logout</button>
    </div>
}

export default Profile;