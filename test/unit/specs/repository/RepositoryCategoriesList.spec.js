import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';
import RepositoryCategoriesList from '@/components/repository/RepositoryCategoriesList';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('RepositoryCategoriesList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(RepositoryCategoriesList, {
      localVue,
      propsData: {
        categories: [
          { id: 1, name: 'Business' },
          { id: 2, name: 'Technology' },
        ],
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
