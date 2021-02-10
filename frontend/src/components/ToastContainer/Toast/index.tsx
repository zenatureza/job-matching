import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { ToastTypesEnum } from '../../../enums/toastTypes.enum';
import useToast from '../../../hooks/useToast';
import { IToastMessage } from '../../../providers/ToastProvider';
import { Container } from './styles';

interface IToastProps {
  message: IToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<IToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    /**
     * Função automaticamente executada se o componente morrer
     * É necessário pois se o usuário clicar no X antes, deve cancelar o timer
     */

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      key={message.id}
      type={message.type}
      hasdescription={!!message.description ? 1 : 0}
      style={style}
    >
      {icons[message.type || ToastTypesEnum.info]}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
