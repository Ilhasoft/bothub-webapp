import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilterEvaluateExample from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import store from '@/store';
import _ from 'lodash';
import BH from 'bh';


const localVue = createLocalVue();
localVue.use(BH);

describe('TestView.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(FilterEvaluateExample, { localVue, store });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Test intent queryString formated', () => {
    beforeEach(() => {
      wrapper.vm.intent = 'like';
    });

    test('valid queryStringFormated emit', () => {
      _.debounce(() => {
        expect(wrapper.emitted('queryStringFormated')).toBeDefined();
      }, 500);
    });
  });

  describe('Test Label query string formated', () => {
    beforeEach(() => {
      wrapper.vm.label = 'animal';
    });

    test('valid queryStringFormated emit', () => {
      _.debounce(() => {
        expect(wrapper.emitted('queryStringFormated')).toBeDefined();
      }, 500);
    });
  });

  describe('Test entitie query string formated', () => {
    beforeEach(() => {
      wrapper.vm.entitie = 'cat';
    });

    test('valid queryStringFormated emit', () => {
      _.debounce(() => {
        expect(wrapper.emitted('queryStringFormated')).toBeDefined();
      }, 500);
    });
  });

  describe('Test text query string formated', () => {
    beforeEach(() => {
      wrapper.setData({
        text: 'i like eat sushi',
      });
    });

    test('valid queryStringFormated emit', () => {
      expect(wrapper.emitted('queryStringFormated')).toBeDefined();
    });
  });
});
