
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BooleanInput from '@/components/form-generator/inputs/BooleanInput';

const localVue = createLocalVue();


describe('BooleanInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BooleanInput, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
