import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhButton from './BhButton';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhButton.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhButton, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('When Priamry props is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        primary: true,
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('When Secondary props is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        secondary: true,
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When Size props is not blank', () => {
    beforeEach(() => {
      wrapper.setProps({
        size: 'small',
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('When Rounded props is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        rounded: true,
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('When Primary and Secondary props is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        primary: true,
        secondary: true,
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('When Primary, Secondary and Roundend props is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        primary: true,
        secondary: true,
        rounded: true,
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('When Primary, Secondary and roundend props is true and size is not blank', () => {
    beforeEach(() => {
      wrapper.setProps({
        primary: true,
        secondary: true,
        rounded: true,
        size: 'smal',
      });
      localVue.nextTick();
    });
    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
