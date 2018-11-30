/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhLanguageFlag from './BhLanguageFlag';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhLanguageFlag.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhLanguageFlag, {
      localVue,
      propsData: {
        language: 'en',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
