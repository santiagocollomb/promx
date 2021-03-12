import React from 'react';

const SignUp = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp'));
const Signin = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn'));

const route = [
  { path: '/registro', exact: true, name: 'Registro', component: SignUp },
  { path: '/ingreso', exact: true, name: 'Ingreso', component: Signin },
];

export default route;
