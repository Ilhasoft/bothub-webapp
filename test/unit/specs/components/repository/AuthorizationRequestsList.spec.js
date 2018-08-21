/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import AuthorizationRequestsList from '@/components-v1/repository/AuthorizationRequestsList';


const localVue = createLocalVue();

describe('AuthorizationRequestsList.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {
        token: '1f5e7e21d331536b58448595f69eb50a6b5e49b8',
      },
    });
    wrapper = shallowMount(AuthorizationRequestsList, {
      localVue,
      propsData: {
        repositoryUuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
      store,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('on item deleted', () => {
    beforeEach(async () => {
      await wrapper.vm.onItemDeleted();
    });

    test('emit review', () => {
      expect(wrapper.emitted('review')).toBeDefined();
    });
  });
});
