import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import App from '@/App';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallow(App, { store, localVue });
    expect(wrapper.find({ ref: 'loginModal' }).exists())
      .toBeTruthy();
  });
});
