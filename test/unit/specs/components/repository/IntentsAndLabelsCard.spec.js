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

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('RepositoryCard.vue', () => {
    beforeEach(() => {
      wrapper = shallowMount(IntentsAndLabelsCard, {
        localVue,
        propsData: {
          title: 'cat',
          labelEntities: ['service', 'pay', 'trade'],
        },
      });
    });

    test('renders correctly when have intents array props', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('RepositoryCard.vue', () => {
    beforeEach(() => {
      wrapper = shallowMount(IntentsAndLabelsCard, {
        localVue,
        propsData: {
          title: 'cat and dog',
          intents: ['service', 'pay', 'trade'],
        },
      });
    });

    test('renders correctly when have entities array props', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
