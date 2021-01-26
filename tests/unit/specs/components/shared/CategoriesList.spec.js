
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CategoriesList from '@/components/shared/CategoriesList';


const localVue = createLocalVue();


describe('CategoriesList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CategoriesList, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
