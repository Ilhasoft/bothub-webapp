import { shallowMount, createLocalVue } from '@vue/test-utils';
import Translations from '@/views/repository/Translations';
import store from '@/store';
import BH from 'bh';


const localVue = createLocalVue();
localVue.use(BH);

describe('Translations.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Translations, { localVue, store });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
