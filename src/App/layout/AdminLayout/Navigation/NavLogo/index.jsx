import React from 'react';
import DEMO from '../../../../../store/constant';
import Aux from '../../../../../hoc/_Aux';
import LogoShort from '../../../../../assets/images/logo-short.svg';
import LogoLong from '../../../../../assets/images/logo-long.svg';

const navLogo = (props) => {
  let toggleClass = ['mobile-menu'];
  if (props.collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <Aux>
      <div className='navbar-brand header-logo'>
        {props.collapseMenu ? (
          <img src={LogoShort} alt='' />
        ) : (
          <img src={LogoLong} alt='' />
        )}
        <a
          href={DEMO.BLANK_LINK}
          className={toggleClass.join(' ')}
          id='mobile-collapse'
          onClick={props.onToggleNavigation}
        >
          <span />
        </a>
      </div>
    </Aux>
  );
};

export default navLogo;
