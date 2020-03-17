import Buefy from 'buefy';
import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import SiteFooter from '@/components/shared/SiteFooter';


const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(BH);

describe('SiteFooter.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SiteFooter, {
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
