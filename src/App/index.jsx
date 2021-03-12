import React, { useContext, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';
import 'react-notifications/lib/notifications.css';
import Loader from './layout/Loader';
import { Auth } from '../context/authContext';
import ScrollToTop from './layout/ScrollToTop';
import routes from '../route';

const AdminLayout = Loadable({
  loader: () => import('./layout/AdminLayout'),
  loading: Loader,
});

const App = () => {
  const { user } = useContext(Auth);

  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        component={route.component}
      />
    ) : null;
  });

  return (
    <ScrollToTop>
      <Suspense fallback={<Loader />}>
        <Switch>
          {menu}
          <Route path='/' component={AdminLayout} />
        </Switch>
      </Suspense>
    </ScrollToTop>
  );
};

export default App;
