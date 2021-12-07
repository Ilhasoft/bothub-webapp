import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserProfile from '@/components/user/UserProfile';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);

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
