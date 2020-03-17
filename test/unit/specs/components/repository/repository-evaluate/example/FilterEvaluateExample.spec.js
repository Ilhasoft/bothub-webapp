import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilterEvaluateExample from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import store from '@/store';
import BH from 'bh';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(BH);

describe('TestView.vue', () => {
  let wrapper;
  let clock;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    wrapper = shallowMount(FilterEvaluateExample, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      store,
    });
  });

  afterEach(() => {
    clock.restore();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('emits queryStringFormated event when intent data changes', () => {
    wrapper.vm.intent = 'like';

    clock.tick(500);

    expect(wrapper.emitted('queryStringFormated')).toBeDefined();
  });

  test('emits queryStringFormated event when entity changes', () => {
    wrapper.vm.entity = 'cat';

    clock.tick(500);

    expect(wrapper.emitted('queryStringFormated')).toBeDefined();
  });

  test('emits queryStringFormated event when text changes', () => {
    wrapper.vm.text = 'i like to eat sushi';
    expect(wrapper.emitted('queryStringFormated')).toBeDefined();
  });
});
