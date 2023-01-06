import { useEffect, useState } from 'react';
import styles from './navbar.module.css';
const Navbar = (props) => {
    const [user, setUser] = useState({});
    useEffect(()=>{
        const user = localStorage.getItem('loggedInUser');
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        userDetails.forEach((element)=>{
            if(element.email?.trim() === user?.trim()){
                setUser(element);
            }
        });
    }, []);
    return <div className={styles['navbar-container']}>
        <h1>Hello, {user.name}</h1>
        <button>Profile</button>
    </div>
}

export default Navbar;