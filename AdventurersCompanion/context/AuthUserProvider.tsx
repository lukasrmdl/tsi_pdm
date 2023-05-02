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
  console.log(children);
  const [user, setUser] = useState('');

  return (
    <AuthUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthUserContext.Provider>
  );
};
