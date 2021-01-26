
import Router from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Layout from '@/components/shared/Layout';
import store from '@/store';
import router from '@/router';

const localVue = createLocalVue();

localVue.use(Router);


describe('Layout.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: { token: null },
      User: {},
    });
    wrapper = shallowMount(Layout, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
      router,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('set title to "abc"', () => {
    beforeEach(() => {
      wrapper.setProps({ title: 'abc' });
    });

    test('document title equal "abc"', () => {
      expect(document.title).toBe('abc');
    });
  });

  // describe('open new repository modal', () => {
  //   beforeEach(() => {
  //     wrapper.vm.openNewRepositoryModal();
  //   });

  //   test('newRepositoryModalOpen is true', () => {
  //     expect(wrapper.vm.newRepositoryModalOpen).toBeTruthy();
  //   });

  //   describe('close new repository modal', () => {
  //     beforeEach(() => {
  //       wrapper.vm.closeNewRepositoryModal();
  //     });

  //     test('newRepositoryModalOpen is false', () => {
  //       expect(wrapper.vm.newRepositoryModalOpen).toBeFalsy();
  //     });
  //   });
  // });

  describe('open my profile without being logged', () => {
    beforeEach(async () => {
      wrapper.vm.openMyProfile();
    });

    test('router path is "/signin"', () => {
      expect(router.history.current.path).toBe('/signin');
    });
  });

  describe('loading', () => {
    beforeEach(() => {
      wrapper.setProps({ loading: true });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
