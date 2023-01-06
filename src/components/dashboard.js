import { useState } from 'react';
// import { ReactDOM } from 'react-dom';
import ReactDOM from 'react-dom';
import Modal from '../commons/modal';
import styles from './dashboard.module.css';

const Dashboard = (props) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [restaurantSelected, setRestaurantSelected] = useState({});
    const restaurants = [{
        name: 'Lalit',
        openingTime: '9 AM',
        closingTime: '10 PM',
        seatingCapacity: 100,
        address: 'Nehru Park',
        rating: '4 stars'
    }, {
        name: 'Taj',
        openingTime: '8 AM',
        closingTime: '7 PM',
        seatingCapacity: 60,
        address: 'Time square',
        rating: '4.8 stars'
    }];
    const onSelectRestaurant = (name) => {
        restaurants.forEach((res)=>{
            if(res.name === name){
                setRestaurantSelected(res);
                toggleModalHandler();
            }
        })
    }
    const toggleModalHandler = (e) => {
        setOpenDetail((prevValue)=>!prevValue);
    }
    return <div className={styles['dashboard-container']}>
        {restaurants.map((element, index)=><div className={styles['res-card']} key={index} onClick={()=>{onSelectRestaurant(element.name)}}>
            <p>Name: {element.name}</p>
            <p>Rating: {element.rating}</p>
        </div>)}
        {openDetail && ReactDOM.createPortal(<Modal closeModal={toggleModalHandler} details={restaurantSelected}></Modal>, document.getElementById('modal-div'))}
    </div>
}

export default Dashboard;