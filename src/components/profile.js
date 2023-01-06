import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/store';
import styles from './profile.module.css';

const Profile = (props) => {
    //this is a profile page where user will get to see all the profile details
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //this will get hit when user wants to logout
    const onLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        dispatch(loginActions.logout());
        navigate('/signin', {replace: true});
    }
    
    return <div className={styles['profile-container']}>
        <button onClick={onLogout}>Logout</button>
    </div>
}

export default Profile;