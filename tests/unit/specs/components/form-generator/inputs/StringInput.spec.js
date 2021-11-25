
import { shallowMount, createLocalVue } from '@vue/test-utils';
import StringInput from '@/components/form-generator/inputs/StringInput';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('StringInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(StringInput);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
