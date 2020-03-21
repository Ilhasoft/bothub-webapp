import { shallowMount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy';
import SideBar from '@/components/repository/sidebar/SideBar';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('SideBar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SideBar, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('click on collapse button', () => {
    beforeEach(() => {
      const collapseButton = wrapper.find({ ref: 'collapseButton' });
      collapseButton.trigger('click');
    });
    test('collapse should be false', () => {
      expect(wrapper.vm.collapse).toBeFalsy();
    });
  });
});
