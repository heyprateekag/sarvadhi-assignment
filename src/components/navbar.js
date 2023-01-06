import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = (props) => {

    const [user, setUser] = useState({});
    
    const navigate = useNavigate();

    useEffect(()=>{//to get the email of the logged in user, which is getting set from signin page
        const user = localStorage.getItem('loggedInUser');

        //to get the user details from local storage
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));

        //to get the username of the user by matching from email id
        userDetails.forEach((element)=>{
            if(element.email?.trim() === user?.trim()){
                setUser(element);
            }
        });
    }, []);

    //if user goes to profile page and then want to navigate to dashboard then he/she can navigate
    const openDashboard = () => {
        navigate('/dashboard');
    }

    //if user wants to go to his profile page
    const openProfile = () => {
        navigate('/profile');
    }

    return <div className={styles['navbar-container']}>
        <h1>Hello, {user.name}</h1>
        <button className={styles['profile-btn']} onClick={openProfile}>Profile</button>
        <button className={styles['dashboard-btn']} onClick={openDashboard}>Dashboard</button>
    </div>
}

export default Navbar;