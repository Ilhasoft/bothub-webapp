/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import Vuex from 'vuex';

import store from '@/store';

import { shallow, createLocalVue } from '@vue/test-utils';
import NewTranslateForm from '@/components/translate/NewTranslateForm';


const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

describe('NewTranslateForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(NewTranslateForm, {
      localVue,
      propsData: {
        exampleId: 1,
        translateTo: 'pt',
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('fill with valid data', () => {
    const validData = {
      text: 'meu nome é douglas',
      entities: [
        {
          start: 12,
          end: 19,
          entity: 'name',
        },
      ],
    };

    beforeEach(() => {
      wrapper.vm.data = validData;
    });

    test('filled', () => {
      expect(wrapper.vm.data).toMatchObject(validData);
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return true', () => {
        expect(r).toBeTruthy();
      });

      test('emit translated', () => {
        expect(wrapper.emitted('translated')).toHaveLength(1);
      });
    });
  });

  describe('fill with invalid data', () => {
    const validData = {
      text: 'meu nome é douglas',
      entities: [],
    };

    beforeEach(() => {
      wrapper.vm.data = validData;
    });

    test('filled', () => {
      expect(wrapper.vm.data).toMatchObject(validData);
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return false', () => {
        expect(r).toBeFalsy();
      });
    });
  });
});
