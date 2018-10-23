import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RoleSelect from '@/components-v1/inputs/RoleSelect';


const localVue = createLocalVue();
localVue.use(Buefy);


describe('RoleSelect.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RoleSelect, { localVue });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
