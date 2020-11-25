import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import LandingPage from '@/views/LandingPage';
import SignUp from '@/views/auth/SignUp';
import SignIn from '@/views/auth/SignIn';
import RecoverPassword from '@/views/auth/RecoverPassword';
import Terms from '@/views/Terms';
import CreateRepository from '@/views/CreateRepository';
import Profile from '@/views/Profile';
import ResetPassword from '@/components/ResetPassword';
import RepositoryHome from '@/views/repository/Home';
import RepositoryTrainings from '@/views/repository/Trainings';
import RepositoryTranslate from '@/views/repository/Translate';
import RepositoryTranslateExternal from '@/views/repository/TranslateExternal';
import RepositoryTranslations from '@/views/repository/Translations';
import RepositorySettings from '@/views/repository/Settings';
import RepositoryIntegration from '@/views/repository/Integration';
import RepositoryEvaluateManual from '@/views/repository/EvaluateManual';
import RepositoryEvaluateAutomatic from '@/views/repository/EvaluateAutomatic';
import RepositoryResults from '@/views/repository/Results';
import RepositoryResult from '@/views/repository/Result';
import RepositoryVersions from '@/views/repository/Versions';
import RepositoryLog from '@/views/repository/Log';
import PhraseSuggestion from '@/views/repository/PhraseSuggestion';
import Entity from '@/views/repository/Entity';
import Intent from '@/views/repository/Intent';
import NotFound from '@/views/NotFound';
import SafariAlert from '@/views/SafariAlert';
import DashboardLayout from '@/layout/dashboard/DashboardLayout';
import DashboardExternalLayout from '@/layout/dashboard/DashboardExternalLayout';
import PaymentOptions from '@/views/payment/PaymentOptions';
import PaymentInfo from '@/views/payment/PaymentInfo';
import Orgs from '@/views/Orgs';
import Org from '@/views/Org';
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
      path: '/terms',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/signin',
      name: 'signIn',
      component: SignIn,
      beforeEnter: async (to, from, next) => {
        if (store.getters.authenticated) {
          next('/home');
        } else {
          next();
        }
      },
    },
    {
      path: '/recoverpassword',
      name: 'recoverpassword',
      component: RecoverPassword,
      beforeEnter: async (to, from, next) => {
        if (store.getters.authenticated) {
          next('/home');
        } else {
          next();
        }
      },
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp,
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
      path: '/new/',
      name: 'new',
      component: CreateRepository,
    },
    {
      path: '/reset-password/:nickname/:token/',
      component: ResetPassword,
    },
    {
      path: '/external',
      name: 'external',
      component: DashboardExternalLayout,
      children: [
        {
          path: ':ownerNickname/:slug/translate/:token',
          name: 'repository-translate-external',
          component: RepositoryTranslateExternal,
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: ':ownerNickname/:slug/',
          name: 'repository-summary',
          component: RepositoryHome,
        },
        {
          path: ':ownerNickname/:slug/training/',
          name: 'repository-training',
          component: RepositoryTrainings,
        },
        {
          path: ':ownerNickname/:slug/suggestions/',
          name: 'repository-suggestion',
          component: PhraseSuggestion,
        },
        {
          path: ':ownerNickname/:slug/translate/',
          name: 'repository-translate',
          component: RepositoryTranslate,
        },
        {
          path: ':ownerNickname/:slug/translations/',
          name: 'repository-translations-status',
          component: RepositoryTranslations,
        },
        {
          path: ':ownerNickname/:slug/Integration/',
          name: 'repository-integration',
          component: RepositoryIntegration,
        },
        {
          path: ':ownerNickname/:slug/settings/',
          name: 'repository-settings',
          component: RepositorySettings,
        },
        {
          path: ':ownerNickname/:slug/evaluate/manual',
          name: 'repository-test-manual',
          component: RepositoryEvaluateManual,
        },
        {
          path: ':ownerNickname/:slug/evaluate/automatic',
          name: 'repository-test-automatic',
          component: RepositoryEvaluateAutomatic,
        },
        {
          path: ':ownerNickname/:slug/log/',
          name: 'repository-log',
          component: RepositoryLog,
        },
        {
          path: ':ownerNickname/:slug/results/',
          name: 'repository-results',
          component: RepositoryResults,
        },
        {
          path: ':ownerNickname/:slug/entitylist/:entity_id',
          name: 'repository-entitylist',
          component: Entity,
        },
        {
          path: ':ownerNickname/:slug/intentlist/:intent',
          name: 'repository-intentlist',
          component: Intent,
        },
        {
          path: ':ownerNickname/:slug/result/:resultId/',
          name: 'repository-result',
          component: RepositoryResult,
        },
        ...(process.env.VERSION_ENABLED
          ? [{
            path: ':ownerNickname/:slug/versions/',
            name: 'repository-versions',
            component: RepositoryVersions,
          }] : []),
      ],
    },
    {
      path: '/profile/',
      name: 'profile',
      component: Profile,
      beforeEnter: async (to, from, next) => {
        if (!store.getters.authenticated) {
          next('/signin');
        } else {
          next();
        }
      },
    },
    {
      path: '/org/:org_nickname/',
      name: 'org',
      component: Org,
      beforeEnter: async (to, from, next) => {
        if (!store.getters.authenticated) {
          next('/signin');
        } else {
          next();
        }
      },
    },
    {
      path: '/orgs',
      name: 'orgs',
      component: Orgs,
      beforeEnter: async (to, from, next) => {
        if (!store.getters.authenticated) {
          next('/signin');
        } else {
          next();
        }
      },
    },
    ...(process.env.BOTHUB_WEBAPP_PAYMENT_ENABLED
      ? [{
        path: '/payment-options',
        name: 'payment-options',
        component: PaymentOptions,
        beforeEnter: async (to, from, next) => {
          if (!store.getters.authenticated) {
            next('/signin');
          } else {
            next();
          }
        },
      },
      {
        path: '/payment-info',
        name: 'payment-info',
        component: PaymentInfo,
        beforeEnter: async (to, from, next) => {
          if (!store.getters.authenticated) {
            next('/signin');
          } else {
            next();
          }
        },
      },
      ] : []),
    {
      path: '/tutorial',
      name: 'Tutorial',
      component: DashboardLayout,
      children: [
        {
          path: 'training/',
          name: 'tutorial-training',
          component: RepositoryTrainings,
        },
        {
          path: 'quick-test/',
          name: 'tutorial-quick-test',
          component: RepositoryHome,
        },
        {
          path: 'evaluate/',
          name: 'tutorial-evaluate',
          component: RepositoryEvaluateManual,
        },
        {
          path: 'inbox/',
          name: 'tutorial-inbox',
          component: RepositoryLog,
        },
        {
          path: 'translate/',
          name: 'tutorial-translate',
          component: RepositoryTranslate,
        },
        {
          path: 'integrate/',
          name: 'tutorial-integrate',
          component: RepositoryIntegration,
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
    {
      path: '/safariAlert/',
      name: 'safari-alert',
      component: SafariAlert,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
