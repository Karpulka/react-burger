import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  WithPageWrapperHomePage,
  WithPageWrapperNotFound404,
  WithPageWrapperLoginPage,
  WithPageWrapperRegisterPage,
  WithPageWrapperForgotPasswordPage,
  WithPageWrapperResetPasswordPage,
  WithPageWrapperProfilePage,
} from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <WithPageWrapperHomePage />
      </Route>
      <Route path="/login" exact>
        <WithPageWrapperLoginPage />
      </Route>
      <Route path="/register" exact>
        <WithPageWrapperRegisterPage />
      </Route>
      <Route path="/forgot-password" exact>
        <WithPageWrapperForgotPasswordPage />
      </Route>
      <Route path="/reset-password" exact>
        <WithPageWrapperResetPasswordPage />
      </Route>
      <ProtectedRoute path="/profile" exact>
        <WithPageWrapperProfilePage />
      </ProtectedRoute>
      <Route path="/ingredients/:id" exact>
        <WithPageWrapperHomePage />
      </Route>
      <Route>
        <WithPageWrapperNotFound404 />
      </Route>
    </Switch>
  );
}

export default App;
