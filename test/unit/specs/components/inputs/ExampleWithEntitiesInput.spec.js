import { shallowMount, createLocalVue } from '@vue/test-utils';
import ExampleWithEntitiesInput from '@/components/inputs/ExampleWithEntitiesInput';


const localVue = createLocalVue();

describe('ExampleWithEntitiesInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ExampleWithEntitiesInput, { localVue });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
