import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseEvaluateVersions from '@/components/repository/repository-evaluate/BaseEvaluateVersions';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('BaseEvaluateVersions.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BaseEvaluateVersions, {
      localVue,
      propsData: {
        repository: {},
      },
    });
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
