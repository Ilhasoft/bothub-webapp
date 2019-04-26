import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryEvaluate from '@/views/repository/Evaluate';
import store from '@/store';
import BH from 'bh';


const localVue = createLocalVue();
localVue.use(BH);

describe('TestView.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryEvaluate, { localVue, store });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Open new test sentence modal', () => {
    beforeEach(() => {
      wrapper.vm.addEvaluateSentence();
    });

    test('Modal open', () => {
      expect(wrapper.vm.addEvaluateSentenceModalOpen).toBeTruthy();
    });
  });
});
