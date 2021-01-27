import React from 'react';
import { Switch } from 'react-router-dom';
import Index from '../pages/Index';
import Route from './Route';

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Index} exact></Route>
    </Switch>
  );
};

export default Routes;
