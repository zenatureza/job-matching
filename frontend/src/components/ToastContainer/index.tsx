import React from 'react';
import { IToastMessage } from '../../providers/ToastProvider';
import { Container } from './styles';
import Toast from './Toast';
import { useTransition } from 'react-spring';

interface IToastContainerProps {
  messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { left: '-120%', opacity: 0 },
      enter: { left: '0%', opacity: 1 },
      leave: { left: '-120%', opacity: 0 },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item: message, key, props }) => (
        <Toast key={key} message={message} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
