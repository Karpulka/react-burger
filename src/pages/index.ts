import HomePage from './home';
import NotFound404 from './not-found';
import LoginPage from './login';
import RegisterPage from './register';
import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './reset-password';
import ProfilePage from './profile';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import FeedPage from './feed';
import OrderInfo from '../components/order-info/order-info';
import withPageWrapper from '../hocs/with-page-wrapper';

const WithPageWrapperHomePage = withPageWrapper(HomePage);
const WithPageWrapperNotFound404 = withPageWrapper(NotFound404);
const WithPageWrapperLoginPage = withPageWrapper(LoginPage);
const WithPageWrapperRegisterPage = withPageWrapper(RegisterPage);
const WithPageWrapperForgotPasswordPage = withPageWrapper(ForgotPasswordPage);
const WithPageWrapperResetPasswordPage = withPageWrapper(ResetPasswordPage);
const WithPageWrapperProfilePage = withPageWrapper(ProfilePage);
const WithPageWrapperIngredientDetails = withPageWrapper(IngredientDetails);
const WithPageWrapperOrderInfo = withPageWrapper(OrderInfo);
const WithFeedPage = withPageWrapper(FeedPage);

export {
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
};
