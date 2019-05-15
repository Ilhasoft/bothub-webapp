import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EmailInput from '@/components/form-generator/inputs/EmailInput';

const localVue = createLocalVue();
localVue.use(BH);

describe('EmailInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EmailInput, {
      setProps: {
        max_length: null,
        initialData: '',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
