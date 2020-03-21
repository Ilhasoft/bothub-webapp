import Buefy from 'buefy';
import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RequestGenerator from '@/components/repository/RequestGenerator';


const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(BH);

describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RequestGenerator, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        authorizationUuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        defaultLanguageField: 'en',

      },
    });
  });
  test('Check if language renders correctly with default value of props when defaultLanguageField is null', () => {
    wrapper.setProps({ defaultLanguageField: null });
    expect(wrapper.vm.language).toBe('en');
  });

  test('Check if language renders correctly when defaultLanguageField is en', () => {
    wrapper.setProps({ defaultLanguageField: 'en' });
    expect(wrapper.vm.language).toBe('en');
  });


  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
