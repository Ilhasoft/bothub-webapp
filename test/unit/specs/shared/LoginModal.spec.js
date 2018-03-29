import Vue from 'vue';
import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import LoginModal from '@/components/shared/LoginModal';

const localVue = createLocalVue();
localVue.use(Vuex);

const getWrapper = () => {
  store.replaceState({
    LoginModal: {
      open: false,
      next: null,
    },
  });
  return shallow(LoginModal, { store, localVue });
};

describe('LoginModal.vue', () => {
  it('onAuthenticated', (done) => {
    const wrapper = getWrapper();

    Vue.nextTick(() => {
      wrapper.vm.onAuthenticated();
      expect(store.getters.loginModalOpen)
        .toBeFalsy();
      done();
    });
  });

  it('onAuthenticated with next', (done) => {
    const wrapper = getWrapper();
    store.dispatch('openLoginModal', { path: '/myprofile/' });

    Vue.nextTick(() => {
      wrapper.vm.onAuthenticated();
      expect(store.getters.loginModalOpen)
        .toBeFalsy();
      done();
    });
  });
});
