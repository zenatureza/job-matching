import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';
import DefaultLayout from '../pages/_layouts/DefaultLayout';
// import useAuth from '../hooks/useAuth';
// import DefaultLayout from '../pages/_layouts/default';

export interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  // TODO: obter user de um hook associado à autenticação
  // const { getData } = useAuth();
  // const { user } = getData();

  const user = null;

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <DefaultLayout>
            <Component />
          </DefaultLayout>
        ) : (
          // <Redirect to={{ pathname: isPrivate ? '/login' : '/dashboard' }} />
          <Redirect to={{ pathname: '/login' }} />
        );
      }}
    />
  );
};

export default Route;
