import { shallowMount, createLocalVue } from '@vue/test-utils';
import Messages from '@/components/shared/Messages';


const localVue = createLocalVue();

describe('Messages.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Messages, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        msgs: [],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('empty', () => {
    expect(wrapper.findAll('.messages .notification').length)
      .toBe(0);
  });

  describe('set msgs with one item', () => {
    beforeEach(() => {
      wrapper.setProps({ msgs: ['hi'] });
    });

    test('has .notifications items', () => {
      expect(wrapper.findAll('.messages .notification').length)
        .toBe(1);
    });

    test('check snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('set msgs with on error item', () => {
    const text = 'bye';
    beforeEach(() => {
      wrapper.setProps({ msgs: [{ text, class: 'error' }] });
    });

    test('has .notification.is-danger items', () => {
      expect(wrapper.findAll('.messages .notification.is-danger').length)
        .toBe(1);
      expect(wrapper.find('.messages .notification.is-danger').element.textContent)
        .toBe(text);
    });

    test('check snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
