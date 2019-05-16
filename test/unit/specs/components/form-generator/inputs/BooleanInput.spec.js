import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BooleanInput from '@/components/form-generator/inputs/BooleanInput';

const localVue = createLocalVue();
localVue.use(BH);

describe('BooleanInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BooleanInput);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
