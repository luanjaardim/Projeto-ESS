import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { RestaurantItemsList } from '../../components/RestaurantList/index';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { ShoppingCart } from '../../components/ShoppingCart/index';
import { useNavigate } from 'react-router-dom';
import './styles.css';

//some colors
export const green = '#54B544';
export const red = '#FD3939';
export const yellow = '#FFF13E';
export const blue = '#251FA5';
export const white = '#EFF1ED';
export const black = '#131200';

//application base colors
export const colorPageBackgroundDark = black; //fffaba e9e9e9 '#bdbebd'
export const colorPageBackgroundWhite = white; //fffaba e9e9e9 '#bdbebd'
export const colorRestaurantBlock = '#fffaba';
export const colorItemBlock = '#fc5353';
export const colorInnerItemBlock = white;
export const colorToggleShoppingCart = green;
export const colorShoppingCartBackground = '#e9e9e9';
export const colorShoppingCartItems = '#bdbebd';
export const colorSPClearButton = red;
export const colorSPFinishButton = green;
export const colorGoToFinnishedOrders = blue;

export const transformIntoId = (name: string, with_hash: boolean) => {
    return (with_hash ? '#' : '') + name.toLowerCase().replace(/ /g, '_');
}

export const HomePage = () => {
    const api = new APIService();
    const [restaurants, setRestaurants] = useState([]);
    const { user, setCartContext } = useContext(UserContext);
    const [showCart, setShowCart] = useState(false);
    const [background, setBackground] = useState(colorPageBackgroundDark);
    const [backgroundInverse, setBackgroundInverse] = useState(colorPageBackgroundWhite);

    useEffect(() => {
        const fetchRestaurants = async () => {
            setRestaurants((await api.getRestaurants()).data);
        };
        const getCart = async () => {
            if(user !== null) {
                const shoppingCart = await api.getShoppingCart(user.id);
                setCartContext(shoppingCart);
            }

        };
        //run the functions in the correct order
        fetchRestaurants().then(async () => {
            await getCart().then(() => {
            });
        });

    }, []);

    const navigate = useNavigate();
    const goToOrder = () => {
        navigate('/order');
    }

    const changeTheme = () => {
        setBackground(backgroundInverse);
        setBackgroundInverse(background);
    };

    return (
        <div style={{background: background}}>
            <div className="top_container">
                <h1 className="title_restaurants" id="restaurants" style={{color: backgroundInverse}}>Restaurants</h1>
                <div className="top_inner_container">
                    <button className="top_button" style={{background: colorGoToFinnishedOrders}}
                            onClick={goToOrder}> Finished Orders
                    </button>
                    <button className="top_button" id="shopping_cart_button" style={{background: colorToggleShoppingCart}}
                            onClick={() => {setShowCart(!showCart)}}>
                        <img src="../src/app/Shopping_cart/assets/icons/cart.png"
                             alt="Shopping Cart" style={{width:'40px', height:'30px'}}/>
                    </button>
                    <button className="button_theme_toggle" style={{color: background, background: backgroundInverse}} onClick={changeTheme}></button>
                </div>
            </div>
            <div className="restaurants_and_toggle_shopping_cart">
                {user === null ? (
                    <div style={{color: backgroundInverse}}>Not logged</div>
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
