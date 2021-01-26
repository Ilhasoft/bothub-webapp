import { shallowMount, createLocalVue } from '@vue/test-utils';
import Translate from '@/views/repository/Translate';
import store from '@/store';


const localVue = createLocalVue();


describe('Translate.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Translate, {
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
