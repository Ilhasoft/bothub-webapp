
import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserAvatar from '@/components/user/UserAvatar';


const localVue = createLocalVue();


describe('UserAvatar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(UserAvatar, {
      localVue,
      propsData: {
        profile: {
          nickname: 'botinho',
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('with small size', () => {
    beforeEach(() => {
      wrapper.setProps({ size: 'small' });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
