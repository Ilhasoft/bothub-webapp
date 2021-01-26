import Buefy from 'buefy';

import { shallowMount, createLocalVue } from '@vue/test-utils';
import SiteFooter from '@/components/shared/SiteFooter';


const localVue = createLocalVue();
localVue.use(Buefy);


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
