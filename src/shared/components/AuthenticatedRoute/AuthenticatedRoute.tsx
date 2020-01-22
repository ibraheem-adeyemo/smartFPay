import React from 'react';
import {Route, Redirect} from 'react-router-dom';

interface IProps {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

const AuthenticatedRoute = ({component: Component, ...rest}: IProps)=> (
    <Route
       render={rest => 
        localStorage.getItem("email") ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );

  export default AuthenticatedRoute;