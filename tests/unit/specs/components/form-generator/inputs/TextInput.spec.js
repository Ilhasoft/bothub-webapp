
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TextInput from '@/components/form-generator/inputs/TextInput';

const localVue = createLocalVue();


describe('TextInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TextInput);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
