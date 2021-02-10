import React from 'react';
import { Switch } from 'react-router-dom';
import Index from '../pages/Index';
import { ToastProvider } from '../providers/ToastProvider';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <ToastProvider>
        <Route path="/" component={Index} exact></Route>
      </ToastProvider>
    </Switch>
  );
};

export default Routes;
