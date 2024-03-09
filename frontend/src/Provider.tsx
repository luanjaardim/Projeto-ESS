import { createContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  cnpj?: string;
  cpf?: string;
}

interface UserContextType {
  user: User | null;
  setUserContext: (user: User) => void;
}

//create context
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserContext = (user: any) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};
