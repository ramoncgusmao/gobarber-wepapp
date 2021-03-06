import React, { useEffect } from 'react';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/Toast';


import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';
interface ToastProps {
  message: ToastMessage;
}

const icon = {
  info: <FiInfo size={24} />,
  error:  <FiAlertCircle size={24}/>,
  success: <FiCheckCircle size={24} />,
}

const Toast: React.FC<ToastProps> = ({ message}) => {

  const { removeToast } = useToast();

  useEffect(() =>{
    const timer = setTimeout(() =>{
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [removeToast, message.id]);


  return (
    <Container type={message.type}
      hasDescription={Number(!!message.description)}>
      {icon[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        <p>{message.description} </p>
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>

  )
}

export default Toast;
