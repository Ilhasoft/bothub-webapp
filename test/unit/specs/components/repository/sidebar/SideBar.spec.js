import { shallowMount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy'
import SideBar from '@/components/repository/sidebar/SideBar';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('SideBar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SideBar);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('click on colapse button', () => {
    beforeEach(() => {
      wrapper = shallowMount(SideBar);
      const colapseButton = wrapper.find({ ref: 'colapseButton' });
      colapseButton.trigger('click');
    });
    test('Colapse should be false', () => {
      expect(wrapper.vm.colapse).toBeFalsy();
    });
  });
});
