import BH from 'bh';
import Router from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryNavigation from '@/components/repository/RepositoryViewBase/RepositoryNavigation';
import router from '@/router';


const localVue = createLocalVue();
localVue.use(BH);
localVue.use(Router);


describe('RepositoryNavigation.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryNavigation, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        repository: {},
      },
      router,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('goTo home', () => {
    beforeEach(() => {
      wrapper.vm.goTo('landingPage');
    });

    test('path is "/"', () => {
      expect(router.history.current.path).toBe('/');
    });
  });
});
