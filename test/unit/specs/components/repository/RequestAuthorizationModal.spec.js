/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import store from '@/store';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';


const localVue = createLocalVue();
localVue.use(BH);

describe('RequestAuthorizationModal.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallowMount(RequestAuthorizationModal, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        repositoryUuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('emits requestDispatched', () => {
    wrapper.vm.onAuthorizationRequested();
    expect(wrapper.emitted('requestDispatched')).toBeDefined();
  });
});
