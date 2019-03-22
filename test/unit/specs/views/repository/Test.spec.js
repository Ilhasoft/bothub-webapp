import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryTest from '@/views/repository/Test';
import store from '@/store';
import BH from 'bh';


const localVue = createLocalVue();
localVue.use(BH);

describe('TestView.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryTest, { localVue, store });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Open new test sentence modal', () => {
    beforeEach(() => {
      wrapper.vm.addTestSentence();
    });

    test('Modal open', () => {
      expect(wrapper.vm.addTestSentenceModalOpen).toBeTruthy();
    });
  });
});
