import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RequestGenerator from '@/components/repository/RequestGenerator';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RequestGenerator, {
      localVue,
      propsData: {
        authorizationUuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
