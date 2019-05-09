import { shallowMount, createLocalVue } from '@vue/test-utils';
import GraphicsResult from '@/components/repository/repository-evaluate/results/GraphicsResult';
import BH from 'bh';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(BH);

describe('GraphicsResult.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(GraphicsResult, {
      localVue,
      propsData: {
        chartData: {
          id: 2,
          confidence_chart: 'https://s3.amazonaws.com/bothub-sample/hist.png',
          matrix_chart: 'https://s3.amazonaws.com/bothub-sample/confmat.png',
          created_at: '2019-05-06T13:04:15.850503Z',
          entities_list: [
            {
              entity: 'cuisine',
              score: {
                accuracy: null,
                f1_score: '0.95',
                precision: '1.00',
                recall: '0.90',
                support: 10,
              },
            },
          ],
          intents_list: [
            {
              intent: 'greet',
              score: {
                accuracy: null,
                f1_score: '1.00',
                precision: '1.00',
                recall: '1.00',
                support: 11,
              },
            },
          ],
          entity_results: {
            accuracy: '0.98',
            f1_score: '0.98',
            precision: '0.98',
          },
          intent_results: {
            accuracy: '0.98',
            f1_score: '0.98',
            precision: '0.98',
          },
          log: [
            {
              intent: 'greet',
              intent_prediction: {
                confidence: 0.9263743763408538,
                name: 'greet',
              },
              status: 'success',
              text: 'hey',
            },
          ],
        },
      },
    });
  });

  describe('renders', () => {
    it('renders', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('re-renders after charts data changes', () => {
      wrapper.setProps({
        chartData: {
          entities_list: [
            {
              entity: 'cuisine',
              score: {
                accuracy: null,
                f1_score: '0.95',
                precision: '1.00',
                recall: '0.90',
                support: 10,
              },
            },
          ],
          intents_list: [
            {
              intent: 'greet',
              score: {
                accuracy: null,
                f1_score: '1.00',
                precision: '1.00',
                recall: '1.00',
                support: 11,
              },
            },
          ],
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mocks methods', () => {
    it('re-renders intents charts when the chartData prop changes', () => {
      const createIntentChartMethodStub = sinon.stub();

      wrapper.setMethods({
        createIntentChart: createIntentChartMethodStub,
      });

      expect(createIntentChartMethodStub.called).toBeFalsy();

      wrapper.setProps({
        chartData: {
          intents_list: [
            {
              intent: 'greet',
              score: {
                accuracy: null,
                f1_score: '1.00',
                precision: '1.00',
                recall: '1.00',
                support: 11,
              },
            },
          ],
          entities_list: [
            {
              entity: 'cuisine',
              score: {
                accuracy: null,
                f1_score: '0.95',
                precision: '1.00',
                recall: '0.90',
                support: 10,
              },
            },
          ],
        },
      });

      expect(createIntentChartMethodStub.called).toBeTruthy();
    });

    it('re-renders entities chart when the chartData prop changes', () => {
      const createEntitiesChartMethodStub = sinon.stub();

      wrapper.setMethods({
        createEntitiesChart: createEntitiesChartMethodStub,
      });

      expect(createEntitiesChartMethodStub.called).toBeFalsy();

      wrapper.setProps({
        chartData: {
          intents_list: [
            {
              intent: 'greet',
              score: {
                accuracy: null,
                f1_score: '1.00',
                precision: '1.00',
                recall: '1.00',
                support: 11,
              },
            },
          ],
          entities_list: [
            {
              entity: 'cuisine',
              score: {
                accuracy: null,
                f1_score: '0.95',
                precision: '1.00',
                recall: '0.90',
                support: 10,
              },
            },
          ],
        },
      });

      expect(createEntitiesChartMethodStub.called).toBeTruthy();
    });
  });
});
