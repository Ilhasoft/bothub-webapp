/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import applyFilters from '@/utils/filters';
import { ROLE_USER } from '@/utils';
import OrgAuthorizationItem from '@/components/org/OrgAuthorizationItem';


const localVue = createLocalVue();
localVue.use(Buefy);
applyFilters(localVue);

describe('AuthorizationItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(OrgAuthorizationItem, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        uuid: 'de6e3f36-833f-4ef8-a3da-c576ea606139',
        user__nickname: 'douglas',
        organization: 5,
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

  // describe('change role', () => {
  //   beforeEach(async () => {
  //     wrapper.vm.newRole = ROLE_USER;
  //     await wrapper.vm.updateRole();
  //   });

  //   test('emit roleChanged event', () => {
  //     expect(wrapper.emitted('updateList')).toBeDefined();
  //   });
  // });

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
