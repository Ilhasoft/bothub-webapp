import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import router from '@/router';
import LoginModal from '@/components-v1/shared/LoginModal';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('LoginModal.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {
        token: null,
      },
      LoginModal: {
        open: false,
        next: null,
        redirectToWhenFails: null,
      },
    });
    wrapper = shallowMount(LoginModal, {
      store,
      router,
      localVue,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
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
