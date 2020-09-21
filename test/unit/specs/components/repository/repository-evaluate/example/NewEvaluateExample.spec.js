/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import Vuex from 'vuex';

import NewEvaluateExample from '@/components/repository/repository-evaluate/example/NewEvaluateExample';
import getters from '@/store/repository/getters';
import actions from '@/store/evaluate-example/actions';


const localVue = createLocalVue();
localVue.use(BH);
localVue.use(Vuex);

describe('NewEvaluateExample.vue', () => {
  let wrapper;
  let state;
  let store;
  beforeEach(() => {
    state = {
      selectedRepository: {
        uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        intents_list: ['affirm', 'cuisine', 'greet'],
      },
    };

    store = new Vuex.Store({
      modules: {
        Repository: {
          state,
          getters,
          actions,
        },
      },
    });
    wrapper = shallowMount(NewEvaluateExample, {
      localVue,
      props: {
        filterByLanguage: 'en',
      },
      store,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('isValid is false', () => {
    expect(wrapper.vm.isValid).toBeFalsy();
  });

  describe('fill with valid data', () => {
    beforeEach(() => {
      wrapper.vm.text = 'my name is douglas';
      wrapper.vm.intent = 'greet';
      wrapper.vm.entities = [
        {
          start: 11,
          end: 18,
          entity: 'name',
        },
      ];
    });

    test('isValid is true', () => {
      expect(wrapper.vm.isValid).toBeTruthy();
    });

    test('name in availableEntities', () => {
      expect('name').toContain(wrapper.vm.availableEntities);
    });

    describe('entity with label', () => {
      beforeEach(() => {
        wrapper.vm.entities = [
          {
            start: 11,
            end: 18,
            entity: 'name',
            label: 'person',
          },
        ];
      });

      test('person in availableLabels', () => {
        expect('person').toContain(wrapper.vm.availableLabels);
      });
    });

    describe('on submit', () => {
      beforeEach(async () => {
        wrapper.setMethods({
          newEvaluateExample() {
            return new Promise((resolve) => {
              resolve();
            });
          },
        });
        Promise.resolve(wrapper.vm.submitSentence());
        await localVue.nextTick();
      });

      test('return is true', () => {
        expect(wrapper.vm.submitSentence()).toBeTruthy();
      });

      test('created event emitted', async () => {
        expect(wrapper.emitted('created')).toBeDefined();
      });
    });
  });

  describe('fill with invalid data', () => {
    beforeEach(() => {
      wrapper.vm.text = 'my name is douglas';
      wrapper.vm.intent = '';
      wrapper.vm.entities = [];
    });

    test('isValid is false', () => {
      expect(wrapper.vm.isValid).toBeFalsy();
    });

    describe('on submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.submitSentence();
      });

      test('return is false', () => {
        expect(r).toBeFalsy();
      });
    });
  });


  describe('entitiesInput emit entityAdded', () => {
    let entitiesInput;
    beforeEach(() => {
      entitiesInput = wrapper.find({ ref: 'entitiesInput' });
      entitiesInput.vm.$emit('entityAdded', {});
    });

    test('entityAdded event emitted by entitiesInput', () => {
      expect(entitiesInput.emitted('entityAdded')).toBeDefined();
    });
  });

  describe('entitiesInput emit entityEdited', () => {
    let entitiesInput;
    beforeEach(() => {
      entitiesInput = wrapper.find({ ref: 'entitiesInput' });
      entitiesInput.vm.$emit('entityEdited', {});
    });

    test('entityEdited event emitted by entitiesInput', () => {
      expect(entitiesInput.emitted('entityEdited')).toBeDefined();
    });
  });

  describe('textInput emit textSelected', () => {
    let textInput;
    const eventValue = { start: 0, end: 3 };

    beforeEach(() => {
      textInput = wrapper.find({ ref: 'textInput' });
      textInput.vm.$emit('textSelected', eventValue);
    });

    test('textSelected event emitted by entitiesInput', () => {
      expect(textInput.emitted('textSelected')).toBeDefined();
    });

    test('textSelected is equal to value emitted by textInput', () => {
      expect(wrapper.vm.textSelected).toMatchObject(eventValue);
    });
  });
});
