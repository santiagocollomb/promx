import React from 'react';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';

import Aux from '../../../../../hoc/_Aux';
import DEMO from '../../../../../store/constant';
import * as actionTypes from '../../../../../store/actions';

const NavLeft = (props) => {
  let iconFullScreen = ['feather'];
  iconFullScreen = props.isFullScreen
    ? [...iconFullScreen, 'icon-minimize']
    : [...iconFullScreen, 'icon-maximize'];

  return (
    <Aux>
      <ul className='navbar-nav mr-auto'>
        <li>
          <a
            href={DEMO.BLANK_LINK}
            className='full-screen'
            onClick={props.onFullScreen}
          >
            <i className={iconFullScreen.join(' ')} />
          </a>
        </li>
      </ul>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isFullScreen: state.isFullScreen,
    rtlLayout: state.rtlLayout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreen: () => dispatch({ type: actionTypes.FULL_SCREEN }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(NavLeft));
