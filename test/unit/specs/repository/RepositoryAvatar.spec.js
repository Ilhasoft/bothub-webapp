import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import RepositoryAvatar from '@/components/repository/RepositoryAvatar';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('RepositoryAvatar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(RepositoryAvatar, {
      localVue,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
