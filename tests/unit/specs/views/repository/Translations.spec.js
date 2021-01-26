import { shallowMount, createLocalVue } from '@vue/test-utils';
import Translations from '@/views/repository/Translations';
import store from '@/store';


const localVue = createLocalVue();


describe('Translations.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Translations, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
