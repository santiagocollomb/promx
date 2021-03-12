import React from 'react';
import { NavLink } from 'react-router-dom';
import BgPromx from '../../../assets/images/bg-promx.jpg';
import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import Breadcrumb from '../../../App/layout/AdminLayout/Breadcrumb';
import DEMO from '../../../store/constant';

class SignUp1 extends React.Component {
  render() {
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
                  <i className='feather icon-user-plus auth-icon' />
                </div>
                <h3 className='mb-4'>Registrate</h3>
                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Nombre'
                  />
                </div>
                <div className='input-group mb-3'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email'
                  />
                </div>
                <div className='input-group mb-4'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Clave'
                  />
                </div>
                <button className='btn btn-primary shadow-2 mb-4'>
                  Registrate
                </button>
                <p className='mb-0 text-muted'>
                  Ya tienes una cuenta? <NavLink to='/ingreso'>Ingresa</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp1;
