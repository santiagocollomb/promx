import React, { useEffect, useState, useContext } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import BgPromx from '../../../assets/images/bg-promx.jpg';
import { NavLink } from 'react-router-dom';
import { app } from '../../../firebaseConfig';
import { Auth } from '../../../context/authContext';
import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import Breadcrumb from '../../../App/layout/AdminLayout/Breadcrumb';

const SignIn = ({ history }) => {
  const { user } = useContext(Auth);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const login = () => {
    app
      .auth()
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then((loginUser) => {
        loginUser.message &&
          NotificationManager.warning(
            loginUser.message,
            'Close after 3000ms',
            3000
          );
      });
  };

  useEffect(() => {
    if (user) {
      history.push('/usuarios');
    }
  }, [history, user]);

  return (
    <Aux>
      <Breadcrumb />
      <div
        className='auth-wrapper'
        style={{ backgroundImage: `url(${BgPromx})` }}
      >
        <div className='auth-content'>
          <div className='card'>
            <div className='card-body text-center'>
              <div className='mb-4'>
                <i className='feather icon-unlock auth-icon' />
              </div>
              <h3 className='mb-4'>Ingresa al club</h3>
              <div className='input-group mb-3'>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  placeholder='Email'
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className='input-group mb-4'>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  placeholder='Clave'
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
              <button
                className='btn btn-primary shadow-2 mb-4'
                onClick={() => login()}
              >
                Ingresa
              </button>
              <p className='mb-2 text-muted'>
                Has olvidado tu clave?{' '}
                <NavLink to='/ingreso'>Recuperala</NavLink>
              </p>
              <p className='mb-0 text-muted'>
                No tienes cuenta? <NavLink to='/registro'>Registrate</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <NotificationContainer />
    </Aux>
  );
};

export default SignIn;
