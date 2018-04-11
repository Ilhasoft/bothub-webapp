import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import LoginModal from '@/components/shared/LoginModal';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

describe('LoginModal.vue', () => {
  describe('close modal on authenticated', () => {
    describe('without next', () => {
      let wrapper;
      beforeEach(() => {
        store.replaceState({
          LoginModal: {
            open: false,
            next: null,
          },
        });
        wrapper = shallow(LoginModal, { store, localVue });
        store.dispatch('openLoginModal');
        wrapper.vm.onAuthenticated();
      });

      test('closed', () => {
        expect(store.getters.loginModalOpen)
          .toBeFalsy();
      });
    });

    describe('with next', () => {
      let wrapper;
      beforeEach(() => {
        store.replaceState({
          LoginModal: {
            open: false,
            next: null,
          },
        });
        wrapper = shallow(LoginModal, { store, localVue });
        store.dispatch('openLoginModal', { path: '/myprofile/' });
        wrapper.vm.onAuthenticated();
      });

      test('closed', () => {
        expect(store.getters.loginModalOpen)
          .toBeFalsy();
      });
    });
  });
});
