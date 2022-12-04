import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, refreshToken } from '../../services/actions/user';

function ProtectedRoute({ children, ...rest }) {
  const { user } = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();

  const init = async () => {
    const token = window.localStorage.getItem('refreshToken');
    token && (await dispatch(refreshToken()));
    await dispatch(getUserInfo());
    setIsUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  let isUserInfo = Object.keys(user).length;

  return <Route {...rest} render={() => (isUserInfo ? children : <Redirect to="/login" />)} />;
}

ProtectedRoute.propTypes = { children: PropTypes.node };

export default ProtectedRoute;
