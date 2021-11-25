
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EmailInput from '@/components/form-generator/inputs/EmailInput';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('EmailInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EmailInput, {
      propsData: {
        max_length: null,
        initialData: '',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
