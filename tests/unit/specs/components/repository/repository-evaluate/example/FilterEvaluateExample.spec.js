import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilterEvaluateExample from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import store from '@/store';

import sinon from 'sinon';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);


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
      propsData: {
        intent: 'like',
        entity: 'cat',
        text: 'i like to eat sushi',
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

  test('emits querystringformatted event when intent data changes', () => {
    clock.tick(500);

    expect(wrapper.vm.$emit('querystringformatted')).toBeDefined();
  });

  test('emits querystringformatted event when entity changes', () => {
    clock.tick(500);
    expect(wrapper.vm.$emit('querystringformatted')).toBeDefined();
  });

  test('emits querystringformatted event when text changes', () => {
    clock.tick(500);
    expect(wrapper.vm.$emit('querystringformatted')).toBeDefined();
  });
});
