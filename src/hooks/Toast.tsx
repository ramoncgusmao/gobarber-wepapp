import React, { createContext, useCallback, useContext, useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import {uuid} from 'uuidv4';


export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuid();
    
    const toast = {
      id, type, title, description,
    };

    setMessages((state) => [... state, toast]);

  }, []);

  const removeToast = useCallback((id: String) => {
    setMessages(state => state.filter( message => message.id !== id));
   
  }, []);


  return (
    <>
      <ToastContext.Provider value={{ addToast, removeToast }}>
        {children}
        <ToastContainer messages={messages} />
      </ToastContext.Provider>

    </>
  )
}


export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}