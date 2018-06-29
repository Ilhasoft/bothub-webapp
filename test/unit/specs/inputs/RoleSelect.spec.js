import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import RoleSelect from '@/components/inputs/RoleSelect';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('RoleSelect.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(RoleSelect, { localVue });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
