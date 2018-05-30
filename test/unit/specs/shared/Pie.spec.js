import { shallow, createLocalVue } from '@vue/test-utils';
import Pie from '@/components/shared/Pie';
import applyFilters from '@/utils/filters';

const localVue = createLocalVue();
applyFilters(localVue);

describe('Pie.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(Pie, {
      localVue,
      propsData: {
        percent: 10,
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
