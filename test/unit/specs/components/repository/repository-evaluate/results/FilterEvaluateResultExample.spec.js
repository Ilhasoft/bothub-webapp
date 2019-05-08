import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilterEvaluateResultExample from '@/components/repository/repository-evaluate/results/FilterEvaluateResultExample';
import BH from 'bh';


const localVue = createLocalVue();
localVue.use(BH);

describe('FilterEvaluateResultExample.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(FilterEvaluateResultExample, {
      localVue,
      propsData: {
        debounceTime: 2,
        intents: [],
        entities: [],
        labels: [],
      },
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
