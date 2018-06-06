import { shallow, createLocalVue } from '@vue/test-utils';
import ExampleWithEntitiesInput from '@/components/inputs/ExampleWithEntitiesInput';

const localVue = createLocalVue();

describe('ExampleWithEntitiesInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(ExampleWithEntitiesInput, {
      localVue,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
