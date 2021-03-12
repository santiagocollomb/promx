export const adminNavigation = {
  items: [
    {
      id: 'navigation',
      title: 'Secciones',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'users',
          title: 'Usuarios',
          type: 'item',
          url: '/usuarios',
          icon: 'feather icon-users',
        },
        {
          id: 'categories',
          title: 'Categorias',
          type: 'item',
          url: '/categorias',
          icon: 'feather icon-inbox',
        },
        {
          id: 'services',
          title: 'Servicios',
          type: 'item',
          url: '/servicios',
          icon: 'feather icon-folder',
        },
      ],
    },
  ],
};

export const navigation = {
  items: [
    {
      id: 'navigation',
      title: 'Secciones',
      type: 'group',
      icon: 'icon-navigation',
      children: [],
    },
  ],
};
