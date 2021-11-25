
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TextInput from '@/components/form-generator/inputs/TextInput';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('TextInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TextInput);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
