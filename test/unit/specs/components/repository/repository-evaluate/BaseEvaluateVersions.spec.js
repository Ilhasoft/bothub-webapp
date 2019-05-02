import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseEvaluateVersions from '@/components/repository/repository-evaluate/BaseEvaluateVersions';
import BH from 'bh';


const localVue = createLocalVue();
localVue.use(BH);

describe('BaseEvaluateResults.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BaseEvaluateVersions, {
      localVue,
      propsData: {
        repository: {},
      },
    });
  });

  test('rodar teste', () => {
    const runNewTestBtn = wrapper.find({ ref: 'runNewTestButton' });
    expect(runNewTestBtn.exists());
  });
});
