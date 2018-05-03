import { shallow, createLocalVue } from '@vue/test-utils';
import Flag from '@/components/shared/Flag';

const localVue = createLocalVue();

describe('Flag.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(Flag, {
      localVue,
      propsData: { language: 'en' },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
