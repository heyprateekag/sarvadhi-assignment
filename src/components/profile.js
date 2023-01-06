import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/store';
import styles from './profile.module.css';

const Profile = (props) => {
    const [user, setUser] = useState({});
    const [newName, setNewName] = useState('');
    //this is a profile page where user will get to see all the profile details
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loggedInUserDetails')));
    }, []);

    //this will get hit when user wants to logout
    const onLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        dispatch(loginActions.logout());
        navigate('/signin', {replace: true});
    }

    const editDetails = () => {
        user.name = newName;
        localStorage.setItem('loggedInUserDetails', JSON.stringify(user))
    }

    const nameChangedHandler = (event) => {
        setNewName(event.target.value);
    }
    
    return <div className={styles['profile-container']}>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' value={user.name} onChange={nameChangedHandler}/>
        <label htmlFor='number'>Number</label>
        <input id='number' type='number' value={user.mobile} disabled={true}/>
        <lable htmlFor='email'>Email</lable>
        <input id='email' type='email' value={user.email} disabled={true}/>
        <button onClick={editDetails}>Edit</button>
        <button onClick={onLogout}>Logout</button>
    </div>
}

export default Profile;