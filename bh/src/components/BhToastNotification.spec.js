/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhToastNotification from './BhToastNotification.vue';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhToastNotification.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhToastNotification, {
      localVue,
      BH,
    });
  });

  test('renders default correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Success notification', () => {
    beforeEach(() => {
      wrapper.vm.addNew({
        message: 'success message',
        type: 'success',
        time: 5000,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('Create new sucess notification', () => {
      expect(wrapper.vm.list[0].type).toBe('success');
      expect(wrapper.vm.list[0].message).toBe('success message');
    });
  });

  describe('Warning notification', () => {
    beforeEach(() => {
      wrapper.vm.addNew({
        message: 'warning message',
        type: 'warning',
        time: 5000,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('Create new warning notification', () => {
      expect(wrapper.vm.list[0].type).toBe('warning');
      expect(wrapper.vm.list[0].message).toBe('warning message');
    });
  });

  describe('Danger notification', () => {
    beforeEach(() => {
      wrapper.vm.addNew({
        message: 'danger message',
        type: 'Danger',
        time: 5000,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('Create new sucess notification', () => {
      expect(wrapper.vm.list[0].type).toBe('danger');
      expect(wrapper.vm.list[0].message).toBe('danger message');
    });
  });

  describe('Question notification', () => {
    beforeEach(() => {
      wrapper.vm.addNew({
        message: 'question message',
        type: 'question',
        time: 5000,
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('Create new sucess notification', () => {
      expect(wrapper.vm.list[0].type).toBe('question');
      expect(wrapper.vm.list[0].message).toBe('question message');
    });
  });

  describe('Bh notification', () => {
    beforeEach(() => {
      wrapper.vm.addNew({
        message: 'question message',
        type: 'question',
        time: 5000,
      });
    });

    test('notification created', () => {
      expect(wrapper.vm.list.length).toBeGreaterThanOrEqual(1);
    });

    test('notification deleted', () => {
      const item = wrapper.vm.list[0];
      wrapper.vm.close(item);
      expect(wrapper.vm.list.length).toBeLessThan(1);
    });
  });
});
