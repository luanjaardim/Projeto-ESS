import { UserContext } from '../../../../Provider';
import { addToCart } from '../ShoppingCart/index';
import { useContext, useState } from 'react';
import { PopUp } from '../PopUp/index';
import { transformIntoId, colorItemBlock, colorInnerItemBlock } from '../../pages/HomePage/index';
import './styles.css';

const colors = ['#54B544', '#FD3939', '#FFF13E', '#251FA5'];

export const ItemOfRestaurant = ({ restaurantName, item }) => {
    const {user, cart, setCartContext} = useContext(UserContext);
    const [imageLoaded, setImageLoaded] = useState(true);
    const [color, _setColor ] = useState(colors[Math.floor(Math.random() * colors.length)]);
    const [showPopUp, setShowPopUp] = useState(false);

    const handleImageError = () => {
        setImageLoaded(false);
    }

    const id = transformIntoId(restaurantName + ' ' + item.name + ' ' + item.price, false);
    return (
        <div id={id}>
        <div className="item_of_restaurant_and_image" style={{background: colorItemBlock}}>
            <img src= {'../src/app/Shopping_cart/assets/foods/' + (imageLoaded ? item.name : 'unknown') + '.jpg'}
                 alt='image' onError={handleImageError} className='image'/>
            <div className="item_of_restaurant" style={{background:colorInnerItemBlock}}>
                <h4 className="item_of_restaurant_text">
                    {item.name}
                </h4>
                <p className="item_of_restaurant_text">
                    {item.price} $
                </p>
                <button
                    className="button_of_item_of_restaurant" id = {id + '_button'}
                    onClick={() => setShowPopUp(true) }>
                        Add to cart
                </button>
            </div>
        </div>
        {showPopUp && (
            <PopUp
                title="Add to cart?"
                text="Do you want to add this item to your cart?"
                onReject={() => { setShowPopUp(false); }}
                onAccept={() => { addToCart(user, item, {cart, setCartContext, restaurantName}); setShowPopUp(false); }}
            />
        )}

        </div>
    )
};
