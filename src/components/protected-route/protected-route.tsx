import React, { useEffect, useState, FC } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getUserInfo, refreshToken } from '../../services/actions/user';
import { RouteProps } from 'react-router';

interface IProtectedRouteProps extends RouteProps {
  onlyForAuth?: boolean;
  path: string;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ onlyForAuth, children, ...rest }) => {
  const { user } = useAppSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isUserInfo, setIsUserInfo] = useState(!!Object.keys(user).length);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const init = async () => {
    const token = window.localStorage.getItem('refreshToken');
    token && (await dispatch(refreshToken()));
    await dispatch(getUserInfo());
    setIsUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setIsUserInfo(!!Object.keys(user).length);
  }, [user, setIsUserInfo]);

  if (!isUserLoaded) {
    return <>Loading...</>;
  }

  if (!onlyForAuth && isUserInfo) {
    const { from } = location.state || { from: { pathname: '/' } };

    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !isUserInfo) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
