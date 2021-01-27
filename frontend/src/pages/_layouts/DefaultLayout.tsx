import React from 'react';
import Header from '../../components/Header';

import { Wrapper } from './styles';

// TODO: Header
const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default DefaultLayout;
