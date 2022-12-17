import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, refreshToken } from '../../services/actions/user';

function ProtectedRoute({ onlyForAuth, children, ...rest }) {
  const { user } = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isUserInfo, setIsUserInfo] = useState(!!Object.keys(user).length);
  const dispatch = useDispatch();
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
}

ProtectedRoute.propTypes = { onlyForAuth: PropTypes.bool, children: PropTypes.node };

export default ProtectedRoute;
