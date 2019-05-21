import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TextInput from '@/components/form-generator/inputs/TextInput';

const localVue = createLocalVue();
localVue.use(BH);

describe('TextInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TextInput);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
