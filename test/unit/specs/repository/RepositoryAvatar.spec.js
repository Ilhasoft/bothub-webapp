/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import Vuex from 'vuex';

import { shallow, createLocalVue } from '@vue/test-utils';
import RepositoryAvatar from '@/components/repository/RepositoryAvatar';

import store from '@/store';


const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

describe('RepositoryAvatar.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {
        token: '1f5e7e21d331536b58448595f69eb50a6b5e49b8',
      },
    });
    wrapper = shallow(RepositoryAvatar, {
      localVue,
      store,
      propsData: {
        ownerNickname: 'douglas',
        slug: 'repo1',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('voteUp', () => {
    let r;
    beforeEach(async () => {
      r = await wrapper.vm.onUp();
    });

    test('return true', () => {
      expect(r).toBeTruthy();
    });

    describe('unauthenticated', () => {
      let r;
      beforeEach(async () => {
        store.replaceState({
          Auth: {
            token: null,
          },
        });
        r = await wrapper.vm.onUp();
      });

      test('return false', () => {
        expect(r).toBeFalsy();
      });
    })
  });

  describe('voteDown', () => {
    let r;
    beforeEach(async () => {
      r = await wrapper.vm.onDown();
    });

    test('return true', () => {
      expect(r).toBeTruthy();
    });
  });
});
