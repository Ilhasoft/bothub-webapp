import { shallowMount, createLocalVue } from '@vue/test-utils';
import SentencesTest from '@/components/repository/test-sentences/SentencesTest';
import store from '@/store';
import BH from 'bh';


const localVue = createLocalVue();
localVue.use(BH);

describe('SentencesTest.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SentencesTest, {
      localVue,
      store,
      propsData: {
        repository: {
          intents_list: [],
          labels_list: [],
          entities_lis: [],
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Test filter query', () => {
    beforeEach(() => {
      wrapper.vm.onSearch({
        search: 'i like eat sushi',
        intent: 'like',
      });
    });

    test('Valid filter', () => {
      expect(wrapper.vm.query).toMatchObject({
        search: 'i like eat sushi',
        intent: 'like',
      });
    });

    test('Invalid filter', () => {
      expect(wrapper.vm.query).not.toMatchObject({
        search: 'i like eat sushi',
        intent: '',
      });
    });
  });
});
