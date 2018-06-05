import Vuex from 'vuex';
import Buefy from 'buefy';
import Router from 'vue-router';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import router from '@/router';
import LoginModal from '@/components/shared/LoginModal';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);
localVue.use(Router);

describe('LoginModal.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      LoginModal: {
        open: false,
        next: null,
        redirectToWhenFails: null,
      },
    });
    wrapper = shallow(LoginModal, {
      store,
      router,
      localVue,
    });
  });

  describe('simple', () => {
    beforeEach(() => {
      store.dispatch('openLoginModal');
      wrapper.vm.onAuthenticated();
    });

    test('closed', () => {
      expect(store.getters.loginModalOpen)
        .toBeFalsy();
    });
  });

  describe('with next', () => {
    beforeEach(() => {
      store.dispatch('openLoginModal', {
        next: { path: '/myprofile/' },
      });
      wrapper.vm.onAuthenticated();
    });

    test('closed', () => {
      expect(store.getters.loginModalOpen)
        .toBeFalsy();
    });
  });

  describe('with redirectToWhenFails', () => {
    beforeEach(() => {
      store.dispatch('openLoginModal', {
        redirectToWhenFails: { name: 'home' },
      });
      wrapper.vm.onClose();
    });

    test('closed', () => {
      expect(store.getters.loginModalOpen)
        .toBeFalsy();
    });
  });
});
