import { useEffect } from 'react';
import styles from './navbar.module.css';
const Navbar = (props) => {
    useEffect(()=>{
        const userDetail = localStorage()
    })
    return <div className={styles['navbar-container']}>
        <h1>{'Hello Prateek'}</h1>
        <button>Profile</button>
    </div>
}

export default Navbar;