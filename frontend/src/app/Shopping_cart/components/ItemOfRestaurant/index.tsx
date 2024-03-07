import { UserContext } from '../../../../Provider';
import { addToCart } from '../../pages/ShoppingCartPage/index';
import { useContext } from 'react';

export const ItemOfRestaurant = ({ item }) => {
    const {user, cart, setCartContext} = useContext(UserContext);

    return (
        <div>
            <h4>{item.name}</h4>
            <p>{item.price} $</p>
            <button onClick={() => addToCart(user, item, {cart, setCartContext}) }>
                Add to cart
            </button>
        </div>
    )
};
