import { shallowMount, createLocalVue } from '@vue/test-utils';
import Loading from '@/components-v1/shared/Loading';


const localVue = createLocalVue();

describe('Loading.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Loading, { localVue });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
