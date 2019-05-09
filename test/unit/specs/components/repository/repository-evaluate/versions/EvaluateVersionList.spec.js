import { shallowMount, createLocalVue } from '@vue/test-utils';
import EvaluateVersionList from '@/components/repository/repository-evaluate/versions/EvaluateVersionList';
import BH from 'bh';
import store from '@/store';


const localVue = createLocalVue();
localVue.use(BH);

describe('EvaluateVersionList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EvaluateVersionList, {
      localVue,
      propsData: {
        repository: {
          uuid: 'dbe1539c-88ba-43e0-bed5-54729218cec9',
        },
      },
      store,
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
