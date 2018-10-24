import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "is-active",
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
      path: '/editmembers',
      name: 'editmembers',
      component: () => import('./views/EditMembers.vue')
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
    {
      path: '/createraid',
      name: 'createraid',
      component: () => import('./views/CreateRaid.vue'),
      props: true
    },
    {
      path: '/createnews',
      name: 'createnews',
      component: () => import('./views/CreateNews.vue')
    },
    {
      path: "/editcalendar",
      name: "editcalendar",
      component: () => import('./views/EditCalendar.vue')
    }
  ]
})
