import HomePage from './home';
import NotFound404 from './not-found';
import withPageWrapper from '../hocs/with-page-wrapper';

const WithHomePage = withPageWrapper(HomePage);
const WithNotFound404 = withPageWrapper(NotFound404);

export { WithHomePage, WithNotFound404 };
