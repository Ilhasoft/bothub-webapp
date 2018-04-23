import { shallow } from '@vue/test-utils';
import CategoriesList from '@/components/shared/CategoriesList';


describe('CategoriesList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(CategoriesList, { propsData: { categories: [] } });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
