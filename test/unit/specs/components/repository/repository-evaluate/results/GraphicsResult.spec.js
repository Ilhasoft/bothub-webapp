import { shallowMount, createLocalVue } from '@vue/test-utils';
import GraphicsResult from '@/components/repository/repository-evaluate/results/GraphicsResult';


const localVue = createLocalVue();

describe('GraphicsResult.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(GraphicsResult, {
      localVue,
      propsData: {
        chartData: {},
      },
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
