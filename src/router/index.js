import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import MyProfile from '@/components/MyProfile';
import ResetPassword from '@/components/ResetPassword';
import Repository from '@/components/Repository';
import store from '../store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/reset-password/:nickname/:token/',
      component: ResetPassword,
    },
    {
      path: '/myprofile/',
      name: 'myProfile',
      component: MyProfile,
      beforeEnter: async (to, from, next) => {
        if (!store.getters.authenticated) {
          store.dispatch('openLoginModal', {
            next: to,
            redirectToWhenFails: { name: 'home' },
          });
        } else {
          next();
        }
      },
    },
    {
      path: '/:ownerNickname/:slug/',
      name: 'repository',
      component: Repository,
    },
  ],
});
