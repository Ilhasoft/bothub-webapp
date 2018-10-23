import { shallowMount, createLocalVue } from '@vue/test-utils';
import applyFilters from '@/utils/filters';
import Pie from '@/components-v1/shared/Pie';


const localVue = createLocalVue();
applyFilters(localVue);

describe('Pie.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Pie, {
      localVue,
      propsData: {
        percent: 10,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
