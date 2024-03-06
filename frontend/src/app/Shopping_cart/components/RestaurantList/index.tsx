import { ItemOfRestaurant } from '../ItemOfRestaurant/index';
import { useEffect, useState } from 'react';
import APIService from '../../../../shared/components/APIService/index';

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
        <div>
            <h2>{restaurant.name}</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <ItemOfRestaurant item={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
