import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import UserAvatar from '@/components/shared/UserAvatar';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('UserAvatar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(UserAvatar, {
      localVue,
      propsData: { profile: {} },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
