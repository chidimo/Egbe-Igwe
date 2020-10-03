import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ErrorBoundary } from '../../ErrorBoundary';

const Home = React.lazy(() => import('../home/Home'));
const City = React.lazy(() => import('../city/City'));

export const Routes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ErrorBoundary>
        <React.Suspense fallback={<p>Loading</p>}>
          <Switch>
            <Route path="/city/:Name" component={City} />
            <Route path="/" component={Home} />
          </Switch>
        </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
