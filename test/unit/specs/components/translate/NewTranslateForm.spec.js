/* eslint-disable import/first */
jest.mock('@/api/request');

import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import NewTranslateForm from '@/components/translate/NewTranslateForm';
import store from '@/store';


const localVue = createLocalVue();
localVue.use(BH);

describe('NewTranslateForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(NewTranslateForm, {
      localVue,
      propsData: {
        exampleId: 1,
        translateTo: 'pt',
        repository: {},
      },
      store,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
