import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import ErrorMessage from '@/components/shared/ErrorMessage';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('ErrorMessage.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(ErrorMessage, { localVue });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
