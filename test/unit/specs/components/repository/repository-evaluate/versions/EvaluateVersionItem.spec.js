import { shallowMount, createLocalVue } from '@vue/test-utils';
import EvaluateVersionItem from '@/components/repository/repository-evaluate/versions/EvaluateVersionItem';
import BH from 'bh';
import VueMoment from 'vue-moment';
import store from '@/store';


const localVue = createLocalVue();
localVue.use(BH);
localVue.use(VueMoment);

describe('EvaluateVersionItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EvaluateVersionItem, {
      localVue,
      propsData: {
        id: 2,
        version: 2,
        language: 'pt',
        created_at: '2019-05-06T13:04:15.850503Z',
      },
      store,
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
