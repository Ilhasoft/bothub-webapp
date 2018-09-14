import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components-v1/Home';
import MyProfile from '@/components-v1/MyProfile';
import ResetPassword from '@/components-v1/ResetPassword';
import RepositoryHome from '@/views/repository/Home';
import RepositoryTrainings from '@/views/repository/Trainings';
import RepositoryTranslate from '@/views/repository/Translate';
import RepositoryTranslations from '@/views/repository/Translations';
import RepositorySettings from '@/views/repository/Settings';
import RepositoryAnalyzeText from '@/views/repository/AnalyzeText';
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
      name: 'repository-home',
      component: RepositoryHome,
    },
    {
      path: '/:ownerNickname/:slug/trainings/',
      name: 'repository-trainings',
      component: RepositoryTrainings,
    },
    {
      path: '/:ownerNickname/:slug/translate/',
      name: 'repository-translate',
      component: RepositoryTranslate,
    },
    {
      path: '/:ownerNickname/:slug/translations/',
      name: 'repository-translations',
      component: RepositoryTranslations,
    },
    {
      path: '/:ownerNickname/:slug/analyze_text/',
      name: 'repository-analyze-text',
      component: RepositoryAnalyzeText,
    },
    {
      path: '/:ownerNickname/:slug/settings/',
      name: 'repository-settings',
      component: RepositorySettings,
    },
  ],
});
