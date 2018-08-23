import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase/RepositoryViewBase';


const localVue = createLocalVue();
localVue.use(BH);


describe('RepositoryNavigation.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryViewBase, {
      localVue,
      propsData: {
        repository: {},
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('loading', () => {
    beforeEach(() => {
      wrapper.setProps({
        repository: null,
        loading: true,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('error 404', () => {
    beforeEach(() => {
      wrapper.setProps({
        repository: null,
        errorCode: 404,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('error -1', () => {
    beforeEach(() => {
      wrapper.setProps({
        repository: null,
        errorCode: -1,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
