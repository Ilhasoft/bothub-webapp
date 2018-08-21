import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntentLabelCard from '@/components/repository/IntentLabelCard';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntentLabelCard, {
      localVue,
      propsData: {
        title: 'Caminhão',
      },
    });
  });
  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('RepositoryCard.vue', () => {
    beforeEach(() => {
      wrapper = shallowMount(IntentLabelCard, {
        localVue,
        propsData: {
          title: 'Caminhão',
          entities: ['Comprar', 'Alugar', 'vender'],
        },
      });
    });
    test('renders correctly when have entities array props', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
