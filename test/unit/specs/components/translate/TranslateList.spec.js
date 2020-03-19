import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import TranslateList from '@/components/translate/TranslateList';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('TranslateList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TranslateList, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
        from: 'de',
        to: 'es',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('set from and to', () => {
    const from = 'en';
    const to = 'pt';
    beforeEach(() => {
      wrapper.setProps({ from, to });
    });

    test('from and to setted', () => {
      expect(wrapper.vm.from).toBe(from);
      expect(wrapper.vm.to).toBe(to);
    });

    describe('update list', () => {
      beforeEach(async () => {
        await wrapper.vm.updateList();
      });

      test('translateList is not null', () => {
        expect(wrapper.vm.translateList).not.toBe(null);
      });
    });
  });
});
