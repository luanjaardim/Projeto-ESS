import { useContext, useEffect, useState } from 'react';
import { UserContext, Item } from '../../../../Provider';
import APIService from '../../../../shared/components/APIService/index';
import { PopUp, PopUpType } from '../PopUp/index';
import { transformIntoId, colorShoppingCartItems, colorShoppingCartBackground,
         colorSPClearButton, colorSPFinishButton } from '../../pages/HomePage/index';
import './styles.css';

const api = new APIService();

export const addToCart = async (user: any, item: any, context: any) => {
  const {message} = (await api.addItemToCart(user.id, item.id)).data;
  if (message === 'Item added to cart') {
    const items = (await api.getAllItems()).data;
    const itemToAdd = items.find((i) => i.id === item.id)
    context.setCartContext([...context.cart, {id: item.id, name: itemToAdd.name, price: itemToAdd.price, quantity: 1, restaurantName: context.restaurantName}]);
    console.log('Item added to cart');
  } else {
    console.error('Error adding item to cart');
  }
};

const removeFromCart = async (user: any, item: any, context: any) => {
  const {message} = (await api.removeItemFromCart(user.id, item.id)).data;
  console.log(`removeFromCart of ${item.name}: `, message);
  if (message === 'Item removed from cart') {
    context.setCartContext(context.cart.filter((cartItem: any) => cartItem.id !== item.id));
  }
};

const increaseQuantity = async (user: any, item: any, context: any) => {
  const item_quantity = context.cart.find((cartItem: any) => cartItem.id === item.id).quantity;
  const {message} = (await api.updateItemFromCart(user.id, item.id, item_quantity + 1)).data;
  if(message === 'Item updated')
    context.setCartContext(context.cart.map(
      (cartItem: any) => cartItem.id === item.id ? {...cartItem, quantity: item_quantity + 1} : cartItem)
    );
};

const decreaseQuantity = async (user: any, item: any, context: any) => {
  const item_quantity = context.cart.find((cartItem: any) => cartItem.id === item.id).quantity;
  const {message} = (await api.updateItemFromCart(user.id, item.id, item_quantity - 1)).data;
  if(message === 'Item updated') {
    context.setCartContext(context.cart.map(
      (cartItem: any) => cartItem.id === item.id ? {...cartItem, quantity: item_quantity - 1} : cartItem)
    );
    console.log('Item updated');
  }
  else {
    console.error('Error updating item quantity');
  }
};

const finishOrder = async (user: any, context: any) => {
  const totalPrice = context.cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0.0);
  const {message} = (await api.finishOrder(user.id, totalPrice)).data;
  if(message === 'Order finished') {
    context.setCartContext([]);
    console.log('Order finished');
  } else {
    console.error('Error finishing order');
  }
};

const eraseCart = (user: any, context: any) => {
  const { cart, setCartContext } = context;
  cart.forEach(async (item: any) => {
    await api.removeItemFromCart(user.id, item.id);
  });
  setCartContext([]);
};

enum PopUpOperationType {
  None,
  RemoveFromCart,
  FinishOrder,
  ClearCart
}

export const ShoppingCart = () => {
  const {user, cart, setCartContext} = useContext(UserContext);
  const [typePopUp, _setTypePopUp] = useState<PopUpType>(PopUpType.confirmPopUp);
  const [operationPopUp, setOperationPopUp] = useState<PopUpOperationType>(PopUpOperationType.None);
  const [titlePopUp, setTitlePopUp] = useState('');
  const [textPopUp, setTextPopUp] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({id: 0, name: '', price: 0, quantity: 0, restaurantName: ''});

  const tryDeleteItem = (item: Item) => {
    setShowPopUp(true);
    setItemToDelete(item);
    setTitlePopUp('Remove from Cart?');
    setTextPopUp(`Do you want to remove ${item.name} of ${item.restaurantName} from the cart?`);
    setOperationPopUp(PopUpOperationType.RemoveFromCart);
  };

  const tryFinishOrder = () => {
    setShowPopUp(true);
    setTitlePopUp('Finish Order?');
    setTextPopUp('Do you want to finish the order?');
    setOperationPopUp(PopUpOperationType.FinishOrder);
  };

  const tryClearCart = () => {
    setShowPopUp(true);
    setTitlePopUp('Clear Cart?');
    setTextPopUp('Do you want to clear the cart?');
    setOperationPopUp(PopUpOperationType.ClearCart);
  };

  const onAcceptPopUp = () => {
      switch(operationPopUp) {
        case PopUpOperationType.RemoveFromCart:
          removeFromCart(user, itemToDelete, {cart, setCartContext});
          break;
        case PopUpOperationType.FinishOrder:
          finishOrder(user, {cart, setCartContext});
          break;
        case PopUpOperationType.ClearCart:
          eraseCart(user, {cart, setCartContext});
          break;
        default:
          break;
      }
  };

  const shoppingCartItem = (item: Item, parentId: string, id: string) => (
    <div>
      <li key={item.id} className="list_item_shopping_cart" style={{background: colorShoppingCartItems}}>
        <div className="container_buttons" id={parentId}>
          <button className="button_remove" style={{background: '#9a9c98'}} id={id + '_remove'}
                  onClick={() => tryDeleteItem(item)}>
            <img src="../src/app/Shopping_cart/assets/icons/trash.png"
                alt='Remove from Cart' className='image_button_remove'/>
          </button>
          <div className="container_plus_and_minus">
            <button className="button" style={{background: '#54B544'}} id={id + '_plus'}
                    onClick={() => increaseQuantity(user, item, {cart, setCartContext})}> + </button>
            <button className="button" style={{background: '#FD3939'}} id={id + '_minus'}
                    onClick={() => {
                      if(item.quantity > 1)
                        decreaseQuantity(user, item, {cart, setCartContext})
                      else
                        tryDeleteItem(item);
                    }}> - </button>
          </div>
        </div>
        <div>
          <h2>{item.name} x {item.quantity}</h2>
          <p>{(item.price * item.quantity).toFixed(2)} $</p>
        </div>
      </li>
    </div>
  )

  useEffect(() => {
    const getCart = async () => {
      if(user !== null && cart.length === 0) {
        setCartContext(await api.getShoppingCart(user.id));
      }
    };
    getCart().then(() => {});
  }, []);

  return (
    <div className="container" style={{background: colorShoppingCartBackground}}>
      <h1 className="shopping_cart_title" id="shopping_cart">Shopping Cart</h1>
      <ul>
        {cart.map((item: Item) => shoppingCartItem(item,
                                  transformIntoId(item.restaurantName+' '+item.name, false),
                                  transformIntoId(item.restaurantName+' '+item.name+' '+String(item.price)+' '+String(item.quantity), false)
                                ))}
      {(cart.length === 0 ?
        <h3>Your cart is empty</h3> :
        (<div>
          <button className="button_finish_order" id="finish_order" style={{background: colorSPFinishButton}}
                onClick={tryFinishOrder}>Finish the Order</button>
          <button className="button_clear_cart" id="clear_cart" style={{background: colorSPClearButton}}
                onClick={tryClearCart}>Clear Cart </button>
          </div>))
      }
      </ul>
      {showPopUp && (
        <PopUp
          typePopUp={typePopUp}
          title={titlePopUp}
          text={textPopUp}
          onReject={() => setShowPopUp(false)}
          onAccept={() => { onAcceptPopUp(); setShowPopUp(false); }}
          />)
      }
    </div>
  );
};
