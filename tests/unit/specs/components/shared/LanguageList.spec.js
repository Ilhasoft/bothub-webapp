
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LanguageList from '@/components/shared/LanguagesList';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);


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
