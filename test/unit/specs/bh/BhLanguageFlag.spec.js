import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhLanguageFlag from 'bh/components/BhLanguageFlag';


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
