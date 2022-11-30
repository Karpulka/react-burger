import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  WithPageWrapperHomePage,
  WithPageWrapperNotFound404,
  WithPageWrapperLoginPage,
  WithPageWrapperRegisterPage,
} from '../../pages';

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
        <WithPageWrapperHomePage />
      </Route>
      <Route path="/reset-password" exact>
        <WithPageWrapperHomePage />
      </Route>
      <Route path="/profile" exact>
        <WithPageWrapperHomePage />
      </Route>
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
