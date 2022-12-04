import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import {
  WithPageWrapperHomePage,
  WithPageWrapperNotFound404,
  WithPageWrapperLoginPage,
  WithPageWrapperRegisterPage,
  WithPageWrapperForgotPasswordPage,
  WithPageWrapperResetPasswordPage,
  WithPageWrapperProfilePage,
  WithPageWrapperIngredientDetails,
} from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setCurrentIngredient } from '../../services/reducers/ingredients';
import { useDispatch } from 'react-redux';

function App() {
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setCurrentIngredient({}));
    history.goBack();
  };

  return (
    <>
      <Switch location={background || location}>
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
        <Route path="/ingredients/:ingredientId" exact>
          <WithPageWrapperIngredientDetails header={'Детали ингредиента'} />
        </Route>
        <Route>
          <WithPageWrapperNotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:ingredientId">
          <Modal header={'Детали ингредиента'} onClose={handleModalClose}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
