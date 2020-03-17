import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CategoriesList from '@/components/shared/CategoriesList';


const localVue = createLocalVue();
localVue.use(BH);

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
