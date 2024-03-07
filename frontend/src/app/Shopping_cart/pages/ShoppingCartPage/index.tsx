import { useContext, useEffect } from 'react';
import { UserContext } from '../../../../Provider';
import APIService from '../../../../shared/components/APIService/index';
import { Link } from 'react-router-dom';

const api = new APIService();

export const addToCart = async (user: any, item: any, context: any) => {
  const {message} = (await api.addItemToCart(user.id, item.id)).data;
  if (message === 'Item added to cart') {
    const items = (await api.getAllItems()).data;
    const itemToAdd = items.find((i) => i.id === item.id)
    context.setCartContext([...context.cart, {id: item.id, name: itemToAdd.name, price: itemToAdd.price, quantity: 1}]);
    console.log('Item added to cart');
  } else {
    console.error('Error adding item to cart');
  }
};

const removeFromCart = async (user: any, item: any, context: any) => {
  const {message} = (await api.removeItemFromCart(user.id, item.id)).data;
  if (message === 'Item removed from cart') {
    context.setCartContext(context.cart.filter((cartItem: any) => cartItem.id !== item.id));
    console.log('Item removed from cart');
  } else {
    console.error('Error removing item from cart');
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

export const ShoppingCartPage = () => {
  const {user, cart, setCartContext} = useContext(UserContext);
  useEffect(() => {
    const getCart = async () => {
      if(user !== null && cart.length === 0) {
        setCartContext(await api.getShoppingCart(user.id));
      }
    };
    getCart().then(() => {});
  }, []);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item: any) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{(item.price * item.quantity).toFixed(2)} $</p>
            <p>{item.quantity}</p>
            <button onClick={() => removeFromCart(user, item, {cart, setCartContext})}>Remove from cart</button>
            <button onClick={() => increaseQuantity(user, item, {cart, setCartContext})}> + </button>
            <button onClick={() => decreaseQuantity(user, item, {cart, setCartContext})}> - </button>
          </li>
        ))}
      {cart.length === 0 ?
        <h2>Your cart is empty</h2> :
        <button onClick={() => finishOrder(user, {cart, setCartContext})}>Finish the Order</button>
      }
      </ul>
      <Link to="/client/home">Back to home</Link>
    </div>
  );
};
