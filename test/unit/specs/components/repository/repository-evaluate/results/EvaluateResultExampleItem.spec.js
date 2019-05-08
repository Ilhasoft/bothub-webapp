import { shallowMount, createLocalVue } from '@vue/test-utils';
import EvaluateResultExampleItem from '@/components/repository/repository-evaluate/results/EvaluateResultExampleItem';


const localVue = createLocalVue();

describe('EvaluateResultExampleItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EvaluateResultExampleItem, {
      localVue,
      propsData: {
        text: 'hey',
        intent: 'greet',
        entities: [],
        confidence: 0.9263743763408538,
        repository: {},
        status: 'success',
      },
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
