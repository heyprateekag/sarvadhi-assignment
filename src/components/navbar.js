import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
const Navbar = (props) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        const user = localStorage.getItem('loggedInUser');
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        userDetails.forEach((element)=>{
            if(element.email?.trim() === user?.trim()){
                setUser(element);
            }
        });
    }, []);

    const openDashboard = () => {
        navigate('/dashboard');
    }

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