import { useState } from 'react';
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
    return <div className={styles['dashboard-container']}>
        {restaurants.map((element, index)=><div className={styles['res-card']} key={index}>
            <p>Name: {element.name}</p>
            <p>Rating: {element.rating}</p>
        </div>)}
        {openDetail && <div>
            <p>Name: {restaurantSelected.name}</p>
            <p>Opening Time: {restaurantSelected.openingTime}</p>
            <p>Closing Time: {restaurantSelected.closingTime}</p>
            <p>Capacity: {restaurantSelected.seatingCapacity}</p>
            <p>Address: {restaurantSelected.address}</p>
            <p>Rating: {restaurantSelected.rating}</p>
            </div>}
    </div>
}

export default Dashboard;