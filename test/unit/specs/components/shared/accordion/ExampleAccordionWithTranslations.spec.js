import { shallowMount, createLocalVue } from '@vue/test-utils';
import ExampleAccordionWithTranslations from '@/components/shared/accordion/ExampleAccordionWithTranslations';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ExampleAccordionWithTranslations.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ExampleAccordionWithTranslations, {
      localVue,
      store: {
        actions: {
          getTranslations: jest.fn(),
        },
      },
      propsData: {
        id: 0,
        text: 'the possum',
        intent: 'true',
        language: 'en',
        repository: { entities: [] },
      },
      mocks: {
        $t: () => 'some specific text',
        loadTranslations: jest.fn(() => {
          wrapper.vm.translations = [];
        }),
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper.vm).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  describe('waits until open to load', () => {
    test('is null before', () => {
      expect(wrapper.emitted('loadedTranslations')).not.toBeDefined();
    });

    // beforeEach(() => {
    //   wrapper.vm.open = true;
    // //   const accordion = wrapper.find({ ref: 'accordion' });
    // //   accordion.trigger('click');
    // });

    test('function is called', () => {
      wrapper.vm.open = true;
      expect(wrapper.emitted('loadedTranslations')).toBeDefined();
    });
  });
});
