import { createContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  cnpj?: string;
  cpf?: string;
}

export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    restaurantName: string;
}

export interface UserContextType {
  user: User | null;
  setUserContext: (user: User) => void;
  cart: Item[];
  setCartContext: (cart: Item[]) => void;
}

//create context
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Item[]>([]);

  const setUserContext = (user: User) => {
    setUser(user);
  };

  const setCartContext = (cart: Item[]) => {
    setCart(cart);
  };

  return (
    <UserContext.Provider value={{ user, setUserContext, cart, setCartContext }}>
      {children}
    </UserContext.Provider>
  );
};
