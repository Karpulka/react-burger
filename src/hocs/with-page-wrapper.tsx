import * as React from 'react';
import { Subtract } from 'utility-types';
import AppHeader from '../components/app-header/app-header';

const withPageWrapper = <Q extends object>(WrappedComponent: React.ComponentType<Q>) => {
  type P = React.ComponentProps<typeof WrappedComponent>;
  type T = Subtract<P, {}>;

  class WithReview extends React.PureComponent<T> {
    static displayName = `withPageWrapper(${
      WrappedComponent.displayName || WrappedComponent.name
    })`;

    render() {
      return (
        <div className="main">
          <AppHeader />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  return WithReview;
};

export default withPageWrapper;
