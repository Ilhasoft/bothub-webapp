/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';

import TranslateExampleForm from '@/components/translate/TranslateExampleForm';


const localVue = createLocalVue();

describe('TranslateExampleForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TranslateExampleForm, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('loads cache', () => {
    beforeEach(() => {
      wrapper = shallowMount(TranslateExampleForm, {
        localVue,
        propsData: {
          initialData: { text: 'text', entities: [{ value: 'entity', start: 0, end: 1 }] },
          translation: { text: 'text2', entities: [] },
        },
        mocks: {
          $t: () => 'some specific text',
        },
      });
    });


    test('cache text matches', () => {
      expect(wrapper.vm.initialData.text).toEqual('text');
      expect(wrapper.vm.text).toEqual('text');
    });

    test('cache entities matches', () => {
      expect(wrapper.vm.entities).toHaveLength(1);
    });
  });

  describe('loads translation', () => {
    beforeEach(() => {
      wrapper = shallowMount(TranslateExampleForm, {
        localVue,
        propsData: {
          initialData: null,
          translation: { text: 'translate text', entities: [{ value: 'entity', start: 0, end: 1 }, { value: 'entity', start: 2, end: 3 }] },
        },
        mocks: {
          $t: () => 'some specific text',
        },
      });
    });

    test('translation text matches', () => {
      expect(wrapper.vm.text).toEqual('translate text');
    });

    test('translation entities matches', () => {
      expect(wrapper.vm.entities).toHaveLength(2);
    });
  });
});
