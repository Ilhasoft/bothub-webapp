
import { shallowMount, createLocalVue } from '@vue/test-utils';
import PasswordInput from '@/components/form-generator/inputs/PasswordInput';

const localVue = createLocalVue();


describe('PasswordInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PasswordInput);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
