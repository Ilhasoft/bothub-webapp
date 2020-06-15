import { shallowMount, createLocalVue } from '@vue/test-utils';
import CategorySelect from '@/components/repository/CategorySelect';

const localVue = createLocalVue();

let store;

describe('CreateRepositoryForm', () => {
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
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('valid data', () => {
    beforeEach(() => {
      wrapper.vm.list = [{ id: 1, name: 'Category1' }, { id: 2, name: 'Category2' }, { id: 3, name: 'Category3' }];
      const cards = wrapper.findAll({ ref: 'items' });
      cards.at(0).trigger('click');
      cards.at(2).trigger('click');
    });

    test('saved', () => {
      expect(wrapper.vm.selectedCategories[1]).toBeDefined();
      expect(wrapper.vm.selectedCategories[3]).toBeDefined();
      expect(wrapper.vm.selectedCategories[2]).not.toBeDefined();
    });

    test('triggers correctly', () => {
      expect(wrapper.emitted('input')).toBeDefined();
    });
  });
});
