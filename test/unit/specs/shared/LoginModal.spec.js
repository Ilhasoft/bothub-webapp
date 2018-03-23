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
      promise: null,
      resolve: null,
      reject: null,
    },
  });
  return shallow(LoginModal, { store, localVue });
};

describe('LoginModal.vue', () => {
  describe('not open', () => {
    it('not exists', () => {
      const wrapper = getWrapper();
      expect(wrapper.find({ ref: 'loginModal' }).exists())
        .toBeFalsy();
    });
  });

  describe('open', () => {
    it('exists', (done) => {
      const wrapper = getWrapper();
      store.dispatch('openLoginModal');

      Vue.nextTick(() => {
        expect(wrapper.find({ ref: 'loginModal' }).exists())
          .toBeTruthy();
        done();
      });
    });

    it('onAuthenticated', (done) => {
      const wrapper = getWrapper();
      store.dispatch('openLoginModal');

      Vue.nextTick(() => {
        wrapper.vm.onAuthenticated();
        expect(store.getters.loginModalOpen)
          .toBeFalsy();
        done();
      });
    });
  });
});
