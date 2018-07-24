import { shallowMount, createLocalVue } from '@vue/test-utils';
import Flag from '@/components/shared/Flag';


const localVue = createLocalVue();

describe('Flag.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Flag, {
      localVue,
      propsData: { language: 'en' },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
