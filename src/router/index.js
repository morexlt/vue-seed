import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Meetups from '@/components/Meetup/Meetups';
import Personas from '@/components/Personas/Personas';
import CreateMeetup from '@/components/Meetup/CreateMeetup';
import CreatePersona from '@/components/Personas/CreatePersona';
import Profile from '@/components/User/Profile';
import Signup from '@/components/User/Signup';
import Signin from '@/components/User/Signin';
import Meetup from '@/components/Meetup/Meetup';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups,
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard,
    },
    {
      path: '/persona/new',
      name: 'CreatePersona',
      component: CreatePersona,
      beforeEnter: AuthGuard,
    },
    {
      path: '/personas',
      name: 'Personas',
      component: Personas,
      beforeEnter: AuthGuard,
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
  ],
  mode: 'history',
});
