import { shallowMount, createLocalVue } from '@vue/test-utils';

import SafariAlert from '@/views/SafariAlert';
import router from '@/router';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('SafariAlert.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SafariAlert, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      router,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
