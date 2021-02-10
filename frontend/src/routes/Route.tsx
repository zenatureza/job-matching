import React from "react";
import { RouteProps as ReactDOMRouteProps } from "react-router-dom";
import DefaultLayout from "../pages/_layouts/DefaultLayout";

export interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
}: RouteProps) => {
  return (
    <DefaultLayout>
      <Component />
    </DefaultLayout>
  );
};

export default Route;
