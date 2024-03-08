import { createContext, useState } from 'react';

//create context
export const UserContext = createContext({ user: null, setUserContext: (user: any) => {} });

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setUserContext = (user: any) => {
        setUser(user);
    };

    return (
        <UserContext.Provider value={{ user, setUserContext }}>
            {children}
        </UserContext.Provider>
    );
};
