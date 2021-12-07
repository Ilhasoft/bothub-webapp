import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryLog from '@/views/repository/Log';
import store from '@/store';
import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('RepositoryLog.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryLog, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
