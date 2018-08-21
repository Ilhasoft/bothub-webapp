import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryCategoriesList from '@/components-v1/repository/RepositoryCategoriesList';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('RepositoryCategoriesList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryCategoriesList, {
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
