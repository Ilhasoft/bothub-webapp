import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import IntentsAndLabelsList from '@/components/repository/IntentsAndLabelsList';

const localVue = createLocalVue();
localVue.use(BH);

describe('IntentsAndLabelsList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntentsAndLabelsList, {
      localVue,
      propsData: {
        intents: [
          {
            value: 'dog',
            examples__count: 1,
          },
          {
            value: 'cat',
            examples__count: 1,
          },
        ],
        labels: [{
          entities: ['dog', 'cat'],
          repository: 'c60c115c-3f6c-451b-a118-653f1f1fb4fe',
          value: 'animal',
        }],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Check if intents button work correctly', () => {
    beforeEach(() => {
      const intentsBtn = wrapper.find({ ref: 'intents' });
      intentsBtn.vm.$emit('click');
    });

    test('Data return true after intents button clicked', () => {
      expect(wrapper.vm.listActived).toEqual('intents');
    });
  });

  describe('Check if label button change data value correctly', () => {
    beforeEach(() => {
      const labelsBtn = wrapper.find({ ref: 'labels' });
      labelsBtn.vm.$emit('click');
    });

    test('Data return labels after labels button clicked', () => {
      expect(wrapper.vm.listActived).toEqual('labels');
    });
  });
});
