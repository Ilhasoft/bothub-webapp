import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase/RepositoryViewBase';


const localVue = createLocalVue();
localVue.use(BH);


describe('RepositoryViewBase.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryViewBase, {
      localVue,
      propsData: {
        repository: {
          ready_for_train: false,
          requirements_to_train: {
            en: [
              'There was no change in this bot version. No examples or translations for English have been added or removed.',
            ],
          },
          languages_ready_for_train: {
            en: false,
          },
        },
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
