/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { compileToFunctions } from 'vue-template-compiler';

import BH from '..';
import BhCard from './BhCard';


const localVue = createLocalVue();
localVue.use(BH);

const defaultSlotComponent = compileToFunctions('<div>default</div>');
const appendSlotComponent = compileToFunctions('<div>append</div>');

describe('BhCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhCard, {
      localVue,
      slots: {
        default: defaultSlotComponent,
        append: appendSlotComponent,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('set shadow hard', () => {
    beforeEach(() => {
      wrapper.setProps({ shadow: 'hard' });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
