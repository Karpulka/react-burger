import React from 'react';
import AppHeader from '../components/app-header/app-header';

// eslint-disable-next-line react/display-name
const withPageWrapper = (WrappedComponent) => (props) => {
  return (
    <div className="main">
      <AppHeader />
      <WrappedComponent {...props} />
    </div>
  );
};

export default withPageWrapper;
