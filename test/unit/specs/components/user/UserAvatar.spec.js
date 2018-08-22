import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserAvatar from '@/components/user/UserAvatar';


const localVue = createLocalVue();
localVue.use(BH);

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

  describe('with small size', () => {
    beforeEach(() => {
      wrapper.setProps({ size: 'small' });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
