import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, ...rest }) {
  const { user } = useSelector((state) => state.user);

  const isUserInfo = Object.keys(user).length;

  return <Route {...rest} render={() => (isUserInfo ? children : <Redirect to="/login" />)} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
