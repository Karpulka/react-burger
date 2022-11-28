import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { WithHomePage, WithNotFound404 } from '../../pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <WithHomePage />
        </Route>
        <Route>
          <WithNotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
