import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ChoiceInput from '@/components/form-generator/inputs/ChoiceInput';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(BH);

describe('ChoiceInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ChoiceInput, {
      propsData: {
        choices: ['En', 'Pt', 'Pt-Br'],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('update is called when mounted', () => {
    const updateStub = sinon.stub();

    wrapper = shallowMount(ChoiceInput, {
      localVue,
      propsData: {
        choices: ['En', 'Pt', 'Pt-Br'],
      },
      methods: {
        update: updateStub,
      },
    });

    expect(updateStub.called).toBeTruthy();
  });
});
