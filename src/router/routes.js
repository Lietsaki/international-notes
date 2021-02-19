const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/add',
        component: () => import('pages/Editor.vue')
      },
      {
        path: '/edit/:id',
        component: () => import('pages/Editor.vue'),
        props: route => ({
          // Pass the id as a prop, but convert it into a number multiplying it by 1
          // (originally, it is a string)
          id: route.params.id * 1
        })
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
