import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import App from '@/App';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('HelloWorld.vue', () => {
  describe('loginModal', () => {
    const wrapper = shallow(App, { store, localVue });

    describe('close', () => {
      it('no exists', (done) => {
        store.dispatch('closeLoginModal');
        localVue.nextTick(() => {
          expect(wrapper.find({ ref: 'loginModal' }).exists())
            .toBeFalsy();
          done();
        });
      });
    });

    describe('open', () => {
      it('exists', (done) => {
        store.dispatch('openLoginModal');
        localVue.nextTick(() => {
          expect(wrapper.find({ ref: 'loginModal' }).exists())
            .toBeTruthy();
          done();
        });
      });
    });
  });
});
