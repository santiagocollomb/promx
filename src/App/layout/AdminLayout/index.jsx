import React, { useContext, useEffect, Suspense } from 'react';
import { Auth } from '../../../context/authContext';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fullscreen from 'react-full-screen';
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from '../Loader';
import { routes, adminRoutes } from '../../../routes';
import Aux from '../../../hoc/_Aux';
import * as actionTypes from '../../../store/actions';

import './app.scss';

const AdminLayout = ({
  windowWidth,
  layout,
  isFullScreen,
  collapseMenu,
  defaultPath,
  onFullScreenExit,
  onComponentWillMount,
}) => {
  const { user } = useContext(Auth);

  const fullScreenExitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      onFullScreenExit();
    }
  };

  useEffect(() => {
    if (windowWidth > 992 && windowWidth <= 1024 && layout !== 'horizontal') {
      onComponentWillMount();
    }
  }, []);

  const mobileOutClickHandler = () => {
    if (windowWidth < 992 && collapseMenu) {
      onComponentWillMount();
    }
  };

  /* full screen exit call */
  document.addEventListener('fullscreenchange', fullScreenExitHandler);
  document.addEventListener('webkitfullscreenchange', fullScreenExitHandler);
  document.addEventListener('mozfullscreenchange', fullScreenExitHandler);
  document.addEventListener('MSFullscreenChange', fullScreenExitHandler);

  const menu =
    user && user.role === 0
      ? adminRoutes.map((route, index) => {
          return route.component ? (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={(props) => <route.component {...props} />}
            />
          ) : null;
        })
      : routes.map((route, index) => {
          return route.component ? (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={(props) => <route.component {...props} />}
            />
          ) : null;
        });

  return (
    <Aux>
      <Fullscreen enabled={isFullScreen}>
        <Navigation />
        <NavBar />
        <div
          className='pcoded-main-container'
          onClick={() => mobileOutClickHandler}
        >
          <div className='pcoded-wrapper'>
            <div className='pcoded-content'>
              <div className='pcoded-inner-content'>
                <Breadcrumb />
                <div className='main-body'>
                  <div className='page-wrapper'>
                    <Suspense fallback={<Loader />}>
                      <Switch>
                        {menu}
                        <Redirect from='/' to={defaultPath} />
                      </Switch>
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fullscreen>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    defaultPath: state.defaultPath,
    isFullScreen: state.isFullScreen,
    collapseMenu: state.collapseMenu,
    configBlock: state.configBlock,
    layout: state.layout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(AdminLayout));
