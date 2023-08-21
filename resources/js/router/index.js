import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        { path: 'dashboard', component: () => import('../pages/dashboard.vue'), meta: {requiresAuth: true} },
        
        { path: 'account-settings',component: () => import('../pages/account-settings.vue'),meta: { requiresAuth: true} },
        
        { path: 'users', component: () => import('../pages/users.vue'), meta: { requiresAuth: true} },
        { path: 'users/create', component: () => import('../pages/UserForm.vue'), meta: { requiresAuth: true} },
        { path: '/users/:id', component: () => import('../pages/User.vue'),meta: { requiresAuth: true} },
        { path: '/users/:id/edit', component: () => import('../pages/UserForm.vue'),meta: { requiresAuth: true} },

        { path: 'events', component: () => import('../pages/events.vue'), meta: { requiresAuth: true} },
        { path: 'events/create', component: () => import('../pages/EventForm.vue'), meta: { requiresAuth: true} },
        { path: '/events/:id', component: () => import('../pages/Event.vue'),meta: { requiresAuth: true} },
        { path: '/events/:id/edit', component: () => import('../pages/EventForm.vue'),meta: { requiresAuth: true} },
        
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.isLoggedIn) {
//       next({ name: 'Login' })
//     } else {
//       next() 
//     }
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !localStorage.getItem('token')) {
//     next('/');
//   } else {
//     next();
//   }
// });

export default router
