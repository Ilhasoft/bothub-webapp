import { shallowMount, createLocalVue } from '@vue/test-utils';
import FlagsList from '@/components/shared/FlagsList';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('FlagsList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(FlagsList, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        languages: ['en', 'pt'],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
