/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import TYPES from '@/store/types';
import applyFilters from '@/utils/filters';
import { ROLE_USER } from '@/utils';
import AuthorizationItem from '@/components/repository/AuthorizationItem';


const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(BH);
applyFilters(localVue);

describe('AuthorizationItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
      User: { profiles: {} },
    });
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');
    wrapper = shallowMount(AuthorizationItem, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        uuid: 'de6e3f36-833f-4ef8-a3da-c576ea606139',
        user__nickname: 'douglas',
        repository: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        role: 3,
        can_read: true,
        can_contribute: true,
        can_write: true,
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('change role', () => {
    beforeEach(async () => {
      wrapper.vm.newRole = ROLE_USER;
      await wrapper.vm.updateRole();
    });

    test('emit roleChanged event', () => {
      expect(wrapper.emitted('updateList')).toBeDefined();
    });
  });

  // describe('remove', () => {
  //   beforeEach(async () => {
  //     const removePromise = wrapper.vm.remove();
  //     await localVue.nextTick();
  //     wrapper.vm.removeDialog.confirm();
  //     await removePromise;
  //   });

  //   test('emit deleted event', () => {
  //     expect(wrapper.emitted('deleted')).toBeDefined();
  //   });
  // });
});
