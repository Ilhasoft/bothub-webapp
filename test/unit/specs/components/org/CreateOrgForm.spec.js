/* eslint-disable import/first */
jest.mock('@/api/request');
import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
// import store from '@/store';
import CreateOrgForm from '@/components/org/CreateOrgForm';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('CreateOrgForm', () => {
  let wrapper;
  let store;
  beforeEach(() => {
    wrapper = shallowMount(CreateOrgForm, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('valid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        name: 'Org',
        description: 'Description',
        nickname: 'org',
      };
    });

    describe('on submit', () => {
      beforeEach(() => {
        wrapper.find('form').trigger('submit');
      });

      test('no errors', () => {
        expect(wrapper.vm.errors).toMatchObject({});
      });
    });
  });
});
