import Buefy from 'buefy';

import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserAvatar from '@/components/shared/UserAvatar';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('UserAvatar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(UserAvatar, {
      localVue,
      propsData: { profile: {} },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
