import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import SiteFooter from '@/components/shared/SiteFooter';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('SiteFooter.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(SiteFooter, { localVue });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
