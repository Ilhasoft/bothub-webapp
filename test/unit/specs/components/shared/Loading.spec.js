import { shallowMount, createLocalVue } from '@vue/test-utils';
import Loading from '@/components/shared/Loading';


const localVue = createLocalVue();

describe('Loading.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Loading, {
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
