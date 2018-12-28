import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import LandingPage from '@/views/LandingPage';
import MyProfile from '@/components-v1/MyProfile';
import ResetPassword from '@/components-v1/ResetPassword';
import RepositoryHome from '@/views/repository/Home';
import RepositoryTrainings from '@/views/repository/Trainings';
import RepositoryTranslate from '@/views/repository/Translate';
import RepositoryTranslations from '@/views/repository/Translations';
import RepositorySettings from '@/views/repository/Settings';
import RepositoryAnalyzeText from '@/views/repository/AnalyzeText';
import NotFound from '@/views/NotFound';
import store from '../store';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage,
      beforeEnter: async (to, from, next) => {
        if (store.getters.authenticated) {
          next('/home');
        } else {
          next();
        }
      },
    },
    {
      path: '/home',
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
      name: 'repository-summary',
      component: RepositoryHome,
    },
    {
      path: '/:ownerNickname/:slug/training/',
      name: 'repository-training',
      component: RepositoryTrainings,
    },
    {
      path: '/:ownerNickname/:slug/translate/',
      name: 'repository-translate',
      component: RepositoryTranslate,
    },
    {
      path: '/:ownerNickname/:slug/translations/',
      name: 'repository-translations-status',
      component: RepositoryTranslations,
    },
    {
      path: '/:ownerNickname/:slug/Integration/',
      name: 'repository-integration',
      component: RepositoryAnalyzeText,
    },
    {
      path: '/:ownerNickname/:slug/settings/',
      name: 'repository-settings',
      component: RepositorySettings,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
