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
        entities: [
          { start: 3, end: 7, entity: 'kids' },
        ],
        confidence: 0.9263743763408538,
        repository: {},
        status: 'success',
      },
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('derives the entitiesList computed from entities props', () => {
    expect(wrapper.vm.entitiesList).toEqual([
      { value: 'kids', class: 'entity-sunflower', label: 'unlabeled' },
    ]);
  });
});
