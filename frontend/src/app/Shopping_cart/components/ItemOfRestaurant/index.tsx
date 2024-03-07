import { UserContext } from '../../../../Provider';
import { addToCart } from '../../pages/ShoppingCartPage/index';
import { useContext } from 'react';
import './styles.css';

export const ItemOfRestaurant = ({ item }) => {
    const {user, cart, setCartContext} = useContext(UserContext);

    return (
        <div className="item_of_restaurant">
            <h4 className="item_of_restaurant_text">{item.name}</h4>
            <p className="item_of_restaurant_text">{item.price} $</p>
            <button
                className="button_of_item_of_restaurant"
                onClick={() => addToCart(user, item, {cart, setCartContext}) }>
                    Add to cart
            </button>
        </div>
    )
};
