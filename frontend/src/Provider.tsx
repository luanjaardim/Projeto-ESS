import { createContext, useState } from 'react';

//create context
export const UserContext = createContext(
    { user: null,
      setUserContext: (user: any) => {},
      cart: [],
      setCartContext: (cart: any) => {} }
);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    const setUserContext = (user: any) => {
        setUser(user);
    };
    const setCartContext = (cart: any) => {
        setCart(cart);
    };

    return (
        <UserContext.Provider value={{ user, setUserContext, cart, setCartContext }}>
            {children}
        </UserContext.Provider>
    );
};
