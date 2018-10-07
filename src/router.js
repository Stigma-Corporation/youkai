import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('./views/Members.vue')
    },
    {
      path: '/profile/equipment',
      name: 'profile-equipment',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/profile/settings',
      name: 'profile-settings',
      component: () => import('./views/ProfileSettings.vue')
    },
    {
      path: '/raid/:id',
      name: 'raid',
      component: () => import('./views/Raids.vue'),
      props: true
    },
  ]
})
