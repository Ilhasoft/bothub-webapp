import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntentsAndLabelsCard from '@/components/repository/IntentsAndLabelsCard';

const localVue = createLocalVue();

describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntentsAndLabelsCard, {
      localVue,
      propsData: {
        title: 'dog',
      },
    });
  });

  test('renders correctly without any array props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('RepositoryCard.vue renders correctly with diferents props', () => {
    beforeEach(() => {
      wrapper = shallowMount(IntentsAndLabelsCard, {
        localVue,
        propsData: {
          title: 'cat and dog',
          intents: ['service', 'pay', 'trade'],
          labelEntities: ['service', 'pay', 'trade'],
        },
      });
    });

    test('When intents array props and labelEntities array props have a arary', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
