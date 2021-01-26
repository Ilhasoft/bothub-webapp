import { shallowMount, createLocalVue } from '@vue/test-utils';
import CategorySelect from '@/components/repository/CategorySelect';

const localVue = createLocalVue();

let store;

describe('CategorySelect', () => {
  let wrapper;
  beforeEach(() => {
    store = {
      getters: {
        getAllCategories: jest.fn(),
      },
    };
    wrapper = shallowMount(CategorySelect, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        loading: false,
        list: [{ id: 1, name: 'Category1' }, { id: 2, name: 'Category2' }, { id: 3, name: 'Category3' }],
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('selects correctly', () => {
    let cards = '';
    beforeEach(() => {
      cards = wrapper.findAllComponents({ ref: 'items' });
    });

    test('triggers correctly', () => {
      expect(cards).toBeDefined();
    });
  });
});
