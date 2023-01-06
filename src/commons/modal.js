import styles from './modal.module.css';

const Modal = (props) => {
    //this modal is for restarant details
    return <div className={styles['overlay']} onClick={(e)=>props.closeModal(e)}>
        <div className={styles['modal']}>
            <p>Name: {props.details.name}</p>
            <p>Opening Time: {props.details.openingTime}</p>
            <p>Closing Time: {props.details.closingTime}</p>
            <p>Capacity: {props.details.seatingCapacity}</p>
            <p>Address: {props.details.address}</p>
            <p>Rating: {props.details.rating}</p>
        </div>
    </div>
}

export default Modal;