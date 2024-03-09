import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { RestaurantItemsList } from '../../components/RestaurantList/index';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { ShoppingCart } from '../../components/ShoppingCart/index';
import './styles.css';

export const transformIntoId = (name: string, with_hash: boolean) => {
    return (with_hash ? '#' : '') + name.toLowerCase().replace(/ /g, '_');
}

export const HomePage = () => {
    const api = new APIService();
    const [restaurants, setRestaurants] = useState([]);
    const { user, setUserContext, setCartContext } = useContext(UserContext);
    const [showCart, setShowCart] = useState(false);

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
                const shoppingCart = await api.getShoppingCart(user.id);
                setCartContext(shoppingCart);
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
        <div style={{background: '#fffaba'}}>
            <div className="top_container">
                <h1 className="title" id="restaurants">Restaurants</h1>
                <div className="top_inner_container">
                    <button className="top_button">
                            <a href='../order'>
                                Pedidos Finalizados </a>
                    </button>
                    <button className="top_button" id="shopping_cart_button"
                            onClick={() => {setShowCart(!showCart)}}>
                        <img src="../src/app/Shopping_cart/assets/icons/cart.png"
                             alt="Shopping Cart" style={{width:'30px', height:'30px'}}/>
                    </button>
                </div>
            </div>
            <div className="restaurants_and_toggle_shopping_cart">
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
                { showCart ?
                    (<div className="shopping_cart">
                        <ShoppingCart />
                     </div>) : null
                }
            </div>
        </div>
    );
};
