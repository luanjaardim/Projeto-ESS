import { ItemOfRestaurant } from '../ItemOfRestaurant/index';
import { useEffect, useState } from 'react';
import APIService from '../../../../shared/components/APIService/index';
import './styles.css';

export const RestaurantItemsList = ({ restaurant }) => {
    const api = new APIService();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getRestaurantItems = async () => {
            const items = await api.getItems(restaurant.id);
            setItems(items.data);
        };
        getRestaurantItems().catch((error) => console.error(error));
    }, [restaurant.id]);

    return (
        <div className="container_of_restaurant_items">
            <h2 className="restaurant_name">{restaurant.name}</h2>
            <ul className="list_of_restaurant_items">
                {items.map((item) => (
                    <li key={item.id}>
                        <ItemOfRestaurant item={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
