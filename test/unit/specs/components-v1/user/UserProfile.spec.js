import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserProfile from '@/components-v1/user/UserProfile';


const localVue = createLocalVue();

describe('UserProfile.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(UserProfile, {
      localVue,
      propsData: {
        profile: {
          name: 'Name',
          nickname: 'nickname',
          locale: 'locale',
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
