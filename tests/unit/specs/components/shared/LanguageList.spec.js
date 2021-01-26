
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LanguageList from '@/components/shared/LanguagesList';


const localVue = createLocalVue();


describe('LanguageList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(LanguageList, {
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
