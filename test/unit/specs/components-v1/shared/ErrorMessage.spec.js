import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ErrorMessage from '@/components-v1/shared/ErrorMessage';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('ErrorMessage.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ErrorMessage, {
      localVue,
      propsData: {
        detail: 'Error 1',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
