import HomePage from './home';
import NotFound404 from './not-found';
import LoginPage from './login';
import RegisterPage from './register';
import withPageWrapper from '../hocs/with-page-wrapper';

const WithPageWrapperHomePage = withPageWrapper(HomePage);
const WithPageWrapperNotFound404 = withPageWrapper(NotFound404);
const WithPageWrapperLoginPage = withPageWrapper(LoginPage);
const WithPageWrapperRegisterPage = withPageWrapper(RegisterPage);

export {
  WithPageWrapperHomePage,
  WithPageWrapperNotFound404,
  WithPageWrapperLoginPage,
  WithPageWrapperRegisterPage,
};
