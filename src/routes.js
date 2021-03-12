import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Users = React.lazy(() => import('./pages/Users'));

const Categories = React.lazy(() => import('./pages/Categories'));

const Services = React.lazy(() => import('./pages/Services'));

const Profile = React.lazy(() => import('./pages/Profile'));

export const adminRoutes = [
  {
    path: '/usuarios',
    exact: true,
    name: 'Default',
    component: Users,
  },
  {
    path: '/categorias',
    exact: true,
    name: 'Basic Button',
    component: Categories,
  },
  {
    path: '/servicios',
    exact: true,
    name: 'Basic Button',
    component: Services,
  },

  {
    path: '/perfil',
    exact: true,
    name: 'Perfil',
    component: Profile,
  },
];

export const routes = [
  {
    path: '/usuarios',
    exact: true,
    name: 'Default',
    component: Users,
  },
  {
    path: '/perfil',
    exact: true,
    name: 'Perfil',
    component: Profile,
  },
];
