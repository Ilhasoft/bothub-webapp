import { shallowMount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy';
import QuickTest from '@/components/quick-test/QuickTest';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('QuickTest.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(QuickTest, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        repository: {
          uuid: 'dbe1539c-88ba-43e0-bed5-54729218cec9',
          available_languages: 'en',
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('click on expand button', () => {
    beforeEach(() => {
      const expandQuickTest = wrapper.find({ ref: 'expandQuickTest' });
      expandQuickTest.trigger('click');
    });

    test('expanded should be truth', () => {
      expect(wrapper.vm.expanded).toBeTruthy();
    });
  });
});
