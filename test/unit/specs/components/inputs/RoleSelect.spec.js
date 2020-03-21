import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RoleSelect from '@/components/inputs/RoleSelect';


const localVue = createLocalVue();
localVue.use(Buefy);


describe('RoleSelect.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RoleSelect, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
