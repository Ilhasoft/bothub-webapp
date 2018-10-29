/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { compileToFunctions } from 'vue-template-compiler';

import BH from '..';
import BhSelect from './BhSelect';


const localVue = createLocalVue();
localVue.use(BH);

const defaultSlotOptionsComponent = compileToFunctions('<option value="Milk">Milk</option>');

describe('BhSelect.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhSelect, {
      localVue,
      slots: {
        default: defaultSlotOptionsComponent,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('BhSelect Disabled renders correctly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhSelect, {
      localVue,
      slots: {
        default: defaultSlotOptionsComponent,
      },
    });
    wrapper.setProps({
      disabled: true,
    });
  });

  test('Disabled Select input', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
