import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';
import TranslateList from '@/components/translate/TranslateList';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);


describe('TranslateList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(TranslateList, {
      localVue,
      store,
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
        from: 'de',
        to: 'es',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
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
