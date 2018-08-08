/* eslint-disable import/first */
jest.mock('@/api/request');

import VueMoment from 'vue-moment';
import Buefy from 'buefy';
import store from '@/store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ExampleItem from '@/components/example/ExampleItem';


const localVue = createLocalVue();
localVue.use(VueMoment);
localVue.use(Buefy);

describe('ExampleItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallowMount(ExampleItem, {
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

  test('mounted', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('delete example', () => {
    beforeEach(async () => {
      const deletePromise = wrapper.vm.deleteThisExample();
      await localVue.nextTick();
      wrapper.vm.deleteDialog.confirm();
      await deletePromise;
    });

    test('emit deleted event', () => {
      expect(wrapper.emitted('deleted')).toBeDefined();
    });
  });
});
