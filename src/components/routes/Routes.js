import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ErrorBoundary } from '../../ErrorBoundary';
import { FallBack } from '../AppLoaders';
import { Navbar } from '../navbar/Navbar';

const Home = React.lazy(() => import('../home/Home'));
const City = React.lazy(() => import('../city/City'));
const NoteIndex = React.lazy(() => import('../notes/NoteIndex'));

export const Routes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ErrorBoundary>
        <React.Suspense fallback={<FallBack />}>
          <Navbar />

          <div className="main-app">
            <Switch>
              <Route path="/city/:Name" component={City} />
              <Route path="/notes" component={NoteIndex} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
