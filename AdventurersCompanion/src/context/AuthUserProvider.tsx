import React, {createContext, useState} from 'react';
console.log(React);

interface AuthUserContextType {
  user: any | null;
  setUser: (user: any | null) => void;
}

export const AuthUserContext = createContext<AuthUserContextType>({
  user: null,
  setUser: () => {},
});

export const AuthUserProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthUserContext.Provider>
  );
};
