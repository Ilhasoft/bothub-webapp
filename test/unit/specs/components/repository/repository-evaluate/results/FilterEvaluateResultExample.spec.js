import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilterEvaluateResultExample from '@/components/repository/repository-evaluate/results/FilterEvaluateResultExample';
import BH from 'bh';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(BH);

describe('FilterEvaluateResultExample.vue', () => {
  let wrapper;
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();

    wrapper = shallowMount(FilterEvaluateResultExample, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        debounceTime: 2,
        intents: [],
        entities: [],
        labels: [],
      },
    });
  });

  afterEach(() => {
    clock.restore();
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('emits queryStringFormated event when text changes', () => {
    wrapper.setData({
      text: 'Something',
    });

    expect(wrapper.emitted('queryStringFormated')).toBeDefined();
    expect(wrapper.emitted('queryStringFormated').length).toBe(1);
    expect(wrapper.emitted('queryStringFormated')[0]).toEqual([{ search: 'Something' }]);
  });

  it('emits queryStringFormated event when intent changes after debounce time', () => {
    wrapper.setData({
      intent: 'Something',
    });

    clock.tick(499);

    expect(wrapper.emitted('queryStringFormated')).toBeUndefined();

    clock.tick(1);

    expect(wrapper.emitted('queryStringFormated')).toBeDefined();
    expect(wrapper.emitted('queryStringFormated').length).toBe(1);
    expect(wrapper.emitted('queryStringFormated')[0]).toEqual([{ intent: 'Something' }]);
  });

  it('emits queryStringFormated event when entity changes after debounce time', () => {
    wrapper.setData({
      entity: 'Something',
    });

    clock.tick(499);

    expect(wrapper.emitted('queryStringFormated')).toBeUndefined();

    clock.tick(1);

    expect(wrapper.emitted('queryStringFormated')).toBeDefined();
    expect(wrapper.emitted('queryStringFormated').length).toBe(1);
    expect(wrapper.emitted('queryStringFormated')[0]).toEqual([{ entity: 'Something' }]);
  });
});
