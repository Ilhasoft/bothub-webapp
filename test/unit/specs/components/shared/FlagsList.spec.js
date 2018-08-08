import { shallowMount, createLocalVue } from '@vue/test-utils';
import FlagsList from '@/components/shared/FlagsList';


const localVue = createLocalVue();

describe('FlagsList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(FlagsList, {
      localVue,
      propsData: {
        languages: ['en', 'pt'],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
