import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Auth } from '../../../../../context/authContext';
import Aux from '../../../../../hoc/_Aux';
import { app } from '../../../../../firebaseConfig';

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';

const NavRight = (props) => {
  const { user } = useContext(Auth);
  let history = useHistory();

  const logout = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        console.log('logout');
        history.push('/ingreso');
      });
  };

  return (
    <Aux>
      <ul className='navbar-nav ml-auto'>
        <li>
          <Dropdown alignRight={!props.rtlLayout} className='drp-user'>
            <Dropdown.Toggle variant={'link'} id='dropdown-basic'>
              <i className='icon feather icon-settings' />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className='profile-notification'>
              <div className='pro-head'>
                <img
                  src={user && user.image ? user.image : Avatar1}
                  className='img-radius'
                  alt='User Profile'
                />
                <span>{user.displayName}</span>
                <span
                  className='dud-logout'
                  title='Logout'
                  onClick={() => logout()}
                >
                  <i className='feather icon-log-out' />
                </span>
              </div>
              <ul className='pro-body'>
                <li>
                  <Link to='/perfil' className='dropdown-item'>
                    <i className='feather icon-user' /> Perfil
                  </Link>
                </li>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </Aux>
  );
};

export default NavRight;
