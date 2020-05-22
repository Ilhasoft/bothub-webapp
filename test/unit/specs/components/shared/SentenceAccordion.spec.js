import { shallowMount, createLocalVue } from '@vue/test-utils';
import Buefy from 'buefy';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('SentenceAccordion.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SentenceAccordion);
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('check click should ignore accordion', () => {
    beforeEach(() => {
      wrapper = shallowMount(SentenceAccordion, {
        propsData: {
          open: false,
        },
      });
      const check = wrapper.find({ ref: 'check' });
      check.trigger('click');
    });
    test('expand should be false', () => {
      expect(wrapper.vm.isOpen).toBeFalsy();
    });
  });

  describe('open accordion header', () => {
    beforeEach(() => {
      wrapper = shallowMount(SentenceAccordion, {
        propsData: {
          open: false,
        },
      });
      const colapseButton = wrapper.find({ ref: 'expander' });
      colapseButton.trigger('click');
    });
    test('Expand should be true', () => {
      expect(wrapper.vm.isOpen).toBeTruthy();
    });
  });

  describe('close accordion header', () => {
    beforeEach(() => {
      wrapper = shallowMount(SentenceAccordion, {
        propsData: {
          open: true,
        },
      });
      const colapseButton = wrapper.find({ ref: 'expander' });
      colapseButton.trigger('click');
    });
    test('Expand should be true', () => {
      expect(wrapper.vm.isOpen).toBeFalsy();
    });
  });
});
