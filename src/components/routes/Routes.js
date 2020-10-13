import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ErrorBoundary } from '../../ErrorBoundary';
import { FallBack } from '../AppLoaders';
import { Navbar } from '../navbar/Navbar';
import { Error404 } from './Error404';

const Home = React.lazy(() => import('../home/Home'));
const City = React.lazy(() => import('../city/City'));
const MyCity = React.lazy(() => import('../city/MyCity'));
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
              <Route path="/my-location/:Name" component={MyCity} />
              <Route path="/notes" component={NoteIndex} />
              <Route exact path="/" component={Home} />
              <Route component={Error404} />
            </Switch>
          </div>
        </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
