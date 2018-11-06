/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import DebounceMixin from './DebounceMixin';


const localVue = createLocalVue();
const Foo = localVue.component(
  'Foo',
  {
    template: '<div />',
    mixins: [
      DebounceMixin,
    ],
  },
);

describe('BhTooltip.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Foo, {
      localVue,
    });
  });

  describe('without debounce', () => {
    describe('onInput', () => {
      const value = 'abc';
      beforeEach(() => {
        wrapper.vm.onInput(value);
      });

      test('emit input event immediately', () => {
        const emitted = wrapper.emitted('input');
        expect(emitted).toBeDefined();
        expect(emitted[0][0]).toBe(value);
      });
    });
  });

  describe('with debounce', () => {
    const time = 300;
    beforeEach(() => {
      wrapper.setProps({
        debounce: time,
      });
    });

    describe('onInput', () => {
      const value = 'abc';
      beforeEach(() => {
        wrapper.vm.onInput(value);
      });

      test('not emit input event immediately', () => {
        const emitted = wrapper.emitted('input');
        expect(emitted).not.toBeDefined();
      });

      test(`wait ${time}ms to emit input event`, (done) => {
        setTimeout(() => {
          const emitted = wrapper.emitted('input');
          expect(emitted).toBeDefined();
          expect(emitted[0][0]).toBe(value);
          done();
        }, time);
      });
    });
  });
});
