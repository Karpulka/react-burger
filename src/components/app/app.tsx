import React, { useEffect } from 'react';
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
  WithPageWrapperOrderInfo,
  WithFeedPage,
} from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';
import { setCurrentIngredient } from '../../services/reducers/ingredients';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getIngredients } from '../../services/actions/ingredients';
import { getUserInfo } from '../../services/actions/user';

function App() {
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserInfo());
  }, [dispatch]);

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
        <ProtectedRoute path="/login" exact>
          <WithPageWrapperLoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" exact>
          <WithPageWrapperRegisterPage />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" exact>
          <WithPageWrapperForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" exact>
          <WithPageWrapperResetPasswordPage />
        </ProtectedRoute>
        {/*<ProtectedRoute path="/profile/orders" exact>*/}
        {/*  */}
        {/*</ProtectedRoute>*/}
        {/*<ProtectedRoute path="/profile/orders/:id" exact>*/}
        {/*  */}
        {/*</ProtectedRoute>*/}
        <ProtectedRoute path="/profile" onlyForAuth exact>
          <WithPageWrapperProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:ingredientId" exact>
          <WithPageWrapperIngredientDetails header={'Детали ингредиента'} />
        </Route>
        <Route path="/feed" exact>
          <WithFeedPage />
        </Route>
        <Route
          path="/feed/:id"
          render={({ history }: { history: any }) => {
            if (history.action === 'POP') {
              return <WithPageWrapperOrderInfo />;
            }
            return (
              <>
                <WithFeedPage />
                <Modal onClose={history.goBack}>
                  <OrderInfo />
                </Modal>
              </>
            );
          }}
          exact></Route>
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
