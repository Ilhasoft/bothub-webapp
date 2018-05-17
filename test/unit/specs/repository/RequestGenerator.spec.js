import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';

import RequestGenerator from '@/components/repository/RequestGenerator';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(RequestGenerator, {
      localVue,
      propsData: {
        authorizationUuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
