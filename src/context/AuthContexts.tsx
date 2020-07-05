import React, {createContext, useCallback, useContext} from 'react';

interface AuthContextInterface {
  name: string;
  signIn(): void;
} 

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider: React.FC = ({children}) => {
  const signIn = useCallback(() => {
    console.log('signIn');
  }, []);
  
  return (
    <AuthContext.Provider value={{ name: 'Diego', signIn}}>
    {children}
    </AuthContext.Provider>
  );
};