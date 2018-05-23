import { shallow } from '@vue/test-utils';
import UserProfile from '@/components/user/UserProfile';


describe('UserProfile.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(UserProfile, {
      propsData: {
        profile: {
          name: 'Name',
          nickname: 'nickname',
          locale: 'locale',
        },
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
