import React, { createContext, useCallback, useState } from 'react';
import { v4 } from 'uuid';
import ToastContainer from '../components/ToastContainer';
import { ToastTypesEnum } from '../enums/toastTypes.enum';

export interface IToastMessage {
  type?: ToastTypesEnum;
  title: string;
  description?: string;
  id: string;
}

export interface IToastContext {
  addToast(message: Omit<IToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessage, 'id'>) => {
      const id = v4();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((previousState) => [...previousState, toast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages((previousState) =>
      previousState.filter((message) => message.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};
