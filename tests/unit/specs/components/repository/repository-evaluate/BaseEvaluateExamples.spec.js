import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseEvaluateExamples from '@/components/repository/repository-evaluate/BaseEvaluateExamples';
import store from '@/store';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('BaseEvaluateExamples.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BaseEvaluateExamples, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        repository: {
          intents_list: [],
          labels_list: [],
          entities_lis: [],
        },
        filterByLanguage: 'en',
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
