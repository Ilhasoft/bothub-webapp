/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import VueMoment from 'vue-moment';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import ExampleItem from '@/components/example/ExampleItem';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueMoment);
localVue.use(Buefy);

describe('ExampleItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallow(ExampleItem, {
      localVue,
      propsData: {
        id: 1,
        entities: [
          { start: 0, end: 0, entity: 'entity' },
        ],
        created_at: '2018-05-11T11:57:40.082934Z',
        repository: {
          authorization: {
            can_contribute: true,
          },
          entities: [],
        },
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('delete example', () => {
    beforeEach(async () => {
      const deletePromise = wrapper.vm.deleteThisExample();
      await localVue.nextTick();
      wrapper.vm.deleteDialog.confirm();
      await deletePromise;
    });

    test('emit deleted', () => {
      expect(wrapper.emitted('deleted').length).toBe(1);
    });
  });
});
