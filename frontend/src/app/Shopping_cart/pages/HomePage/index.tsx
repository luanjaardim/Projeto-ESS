import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { RestaurantItemsList } from '../../components/RestaurantList/index';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const api = new APIService();
    const [restaurants, setRestaurants] = useState([]);
    const { user, setUserContext, setCartContext } = useContext(UserContext);

    useEffect(() => {
        const fetchRestaurants = async () => {
            setRestaurants((await api.getRestaurants()).data);
        };
        const isUserLogged = async () => {
            // TODO: CHECK FOR A POSSIBLE NOT EXISTING USER
            // get the logged user while there is no authentication
            const LoggedUser = await api.getUser(1);
            setUserContext(LoggedUser);
        };
        const getCart = async () => {
            if(user !== null) {
                const sp = await api.getShoppingCart(user.id);
                setCartContext(sp);
            }

        };
        //run the functions in the correct order
        fetchRestaurants().then(async () => {
            await isUserLogged().then( async() => {
                await getCart().then(() => {
                });
            });
        });

    }, []);

    return (
        <div>
            <h1>Restaurants</h1>
            {user === null ? (
                <div>Not logged</div>
            ) : (
                <ul>
                    {
                        restaurants.length > 0 ?
                        restaurants.map((restaurant) => (
                        <li key={restaurant.id}>
                            <RestaurantItemsList restaurant={restaurant} />
                        </li>
                        )) : <h2>No restaurants found</h2>
                    }
                </ul>
            )}
        <Link to="/shopping_cart">Shopping Cart</Link>
        </div>
    );
};
