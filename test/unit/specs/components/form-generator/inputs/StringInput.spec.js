import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import StringInput from '@/components/form-generator/inputs/StringInput';

const localVue = createLocalVue();
localVue.use(BH);

describe('StringInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(StringInput);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
