import { shallowMount, createLocalVue } from '@vue/test-utils';
import EvaluateResultExampleList from '@/components/repository/repository-evaluate/results/EvaluateResultExampleList';
import BH from 'bh';
import store from '@/store';


const localVue = createLocalVue();
localVue.use(BH);

describe('EvaluateResultExampleList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EvaluateResultExampleList, {
      localVue,
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
        id: 2,
      },
      store,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
