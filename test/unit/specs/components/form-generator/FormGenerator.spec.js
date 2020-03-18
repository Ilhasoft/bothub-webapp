import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import FormGenerator from '@/components/form-generator/FormGenerator';

const localVue = createLocalVue();
localVue.use(BH);

describe('FormGenerator.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(FormGenerator, {
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        schema: {},
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
