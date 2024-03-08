import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { RestaurantItemsList } from '../../components/RestaurantList/index';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';

export const HomePage = () => {
    const api = new APIService();
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUserContext } = useContext(UserContext);

    useEffect(() => {
        const fetchRestaurants = async () => {
            setRestaurants((await api.getRestaurants()).data);
        };
        fetchRestaurants().catch((error) => console.error(error));
        setIsLoading(false);
        setUserContext({ user: 'user' });
    }, []);


    return (
        <div>
            <h1>Restaurants</h1>
            {isLoading || user === null ? (
                <div>Carregando...</div>
            ) : (
                <ul>
                    {restaurants.map((restaurant) => (
                        <li key={restaurant.id}>
                            <RestaurantItemsList restaurant={restaurant} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
