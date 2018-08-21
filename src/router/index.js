import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components-v1/Home';
import MyProfile from '@/components-v1/MyProfile';
import ResetPassword from '@/components-v1/ResetPassword';
import Repository from '@/components-v1/Repository';
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
