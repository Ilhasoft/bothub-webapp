import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import HelloWorld from '@/components/HelloWorld';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallow(HelloWorld, { store, localVue });
    const h1 = wrapper.find('.hello h1');
    expect(h1.element.textContent).toBe('Bothub');
  });
});
