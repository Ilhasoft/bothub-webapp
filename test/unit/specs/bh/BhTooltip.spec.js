import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhTooltip from 'bh/components/BhTooltip';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhTooltip.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhTooltip, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Check emitted to be false on div out clicked', () => {
    expect(wrapper.emitted('update:open')).toBeFalsy();
  });

  test('div clicked works', () => {
    wrapper.trigger('click');
  });

  describe('Check focus element when watch open props is actived', () => {
    beforeEach(async () => {
      wrapper.setProps({
        open: true,
      });
      await localVue.nextTick();
    });

    test('watch', () => {
      expect(wrapper.is(':focus')).toBeTruthy();
    });
  });

  describe('when dangers props is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        danger: true,
      });
      localVue.nextTick();
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when direction string is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        direction: 'test-class ',
      });
      localVue.nextTick();
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when direction string is blank', () => {
    beforeEach(() => {
      wrapper.setProps({
        direction: '',
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when direction string is blank and danger boolean is true ', () => {
    beforeEach(() => {
      wrapper.setProps({
        danger: true,
        direction: 'test-class',
      });
      localVue.nextTick();
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
