import { UserContext } from '../../../../Provider';
import { addToCart } from '../ShoppingCart/index';
import { useContext, useState } from 'react';
import { PopUp, PopUpType } from '../PopUp/index';
import { transformIntoId, colorItemBlock, colorInnerItemBlock } from '../../pages/HomePage/index';
import './styles.css';

const colors = ['#54B544', '#FD3939', '#FFF13E', '#251FA5'];

export const ItemOfRestaurant = ({ restaurantName, item }) => {
    const {user, cart, setCartContext} = useContext(UserContext);
    const [imageLoaded, setImageLoaded] = useState(true);
    const [color, _setColor ] = useState(colors[Math.floor(Math.random() * colors.length)]);
    const [titlePopUp, setTitlePopUp] = useState('');
    const [textPopUp, setTextPopUp] = useState('');
    const [typePopUp, setTypePopUp] = useState<PopUpType>(PopUpType.confirmPopUp);
    const [showPopUp, setShowPopUp] = useState(false);

    const handleImageError = () => {
        setImageLoaded(false);
    }

    const handleAddToCart = () => {
        if(cart.find((element) => element.id === item.id)) {
            setTitlePopUp('Item already in cart');
            setTextPopUp('This item is already in your cart');
            setTypePopUp(PopUpType.infoPopUp);
            setShowPopUp(true);
        } else {
            setTitlePopUp("Add to cart?");
            setTextPopUp("Do you want to add this item to your cart?");
            setTypePopUp(PopUpType.confirmPopUp);
            setShowPopUp(true);
        }
    };

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
                    onClick={handleAddToCart}>
                        Add to cart
                </button>
            </div>
        </div>
        {showPopUp && (
            <PopUp
                typePopUp={typePopUp}
                title={titlePopUp}
                text={textPopUp}
                onReject={() => { setShowPopUp(false); }}
                onAccept={() => { if(typePopUp == PopUpType.confirmPopUp) addToCart(user, item, {cart, setCartContext, restaurantName}); setShowPopUp(false); }}
            />
        )}

        </div>
    )
};
