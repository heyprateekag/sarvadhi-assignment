import { useState } from 'react';
// import { ReactDOM } from 'react-dom';
import ReactDOM from 'react-dom';
import Modal from '../commons/modal';
import styles from './dashboard.module.css';

const Dashboard = (props) => {

    //to check whether user wants to see detail of any restaurant in detail
    const [openDetail, setOpenDetail] = useState(false);

    //to store the information of the selected restaurant
    const [restaurantSelected, setRestaurantSelected] = useState({});

    //to fetch details of all the restaurants
    const restaurants = JSON.parse(localStorage.getItem('restaurants'));
    
    //to store the filtered restaurants
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

    //will get called when user will select any restaunt
    const onSelectRestaurant = (name) => {
        restaurants.forEach((res)=>{
            if(res.name === name){
                setRestaurantSelected(res);
                toggleModalHandler();
            }
        })
    }

    //to filter the restaurants with name
    const onSearchByName = (event) => {
        setFilteredRestaurants(restaurants.filter((restaurant)=>{
            if(restaurant.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1){
                return true;
            }
            return false;
        }))
    }

    //will get called when user wants to open or close the modal which contains restarant details
    const toggleModalHandler = (e) => {
        setOpenDetail((prevValue)=>!prevValue);
    }
    
    return <div className={styles['dashboard-container']}>
        <input type='text' className={styles['search-box']} placeholder='Enter Search Name' onChange={onSearchByName}/>
        {filteredRestaurants?.map((element, index)=><div className={styles['res-card']} key={index} onClick={()=>{onSelectRestaurant(element.name)}}>
            <p>Name: {element.name}</p>
            <p>Rating: {element.rating}</p>
        </div>)}
        {filteredRestaurants.length === 0 && <h1>No Restaurants in your area</h1>}
        {openDetail && ReactDOM.createPortal(<Modal closeModal={toggleModalHandler} details={restaurantSelected}></Modal>, document.getElementById('modal-div'))}
    </div>
}

export default Dashboard;