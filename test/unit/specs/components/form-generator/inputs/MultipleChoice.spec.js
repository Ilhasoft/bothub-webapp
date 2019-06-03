import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import MultipleChoice from '@/components/form-generator/inputs/MultipleChoice';

const localVue = createLocalVue();
localVue.use(BH);

describe('MultipleChoice.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MultipleChoice, {
      propsData: {
        choices: ['pt', 'pt-br', 'en'],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
