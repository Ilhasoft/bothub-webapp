import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntentInput from '@/components/inputs/IntentInput';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('IntentInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntentInput, { localVue });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('add intents', () => {
    const intentA = 'abcd';
    const intentB = 'acdb';
    const intentC = 'adcb';
    const intentD = 'bacd';
    const intents = [
      intentA,
      intentB,
      intentC,
      intentD,
    ];

    beforeEach(() => {
      wrapper.setProps({ intents });
    });

    describe('fill with a', () => {
      beforeEach(() => {
        wrapper.setData({ currentValue: 'a' });
      });

      test('filter correcty', () => {
        expect(wrapper.vm.filteredIntents).toEqual([
          intentA,
          intentB,
          intentC,
          intentD,
        ]);
      });
    });

    describe('fill with cd', () => {
      beforeEach(() => {
        wrapper.setData({ currentValue: 'cd' });
      });

      test('filter correcty', () => {
        expect(wrapper.vm.filteredIntents).toEqual([
          intentB,
          intentA,
          intentD,
        ]);
      });
    });

    describe('fill with b', () => {
      beforeEach(() => {
        wrapper.setData({ currentValue: 'cd' });
      });

      test('filter correcty', () => {
        expect(wrapper.vm.filteredIntents).toEqual([
          intentB,
          intentA,
          intentD,
        ]);
      });
    });
  });
});
