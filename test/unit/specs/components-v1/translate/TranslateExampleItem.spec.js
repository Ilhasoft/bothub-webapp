import Buefy from 'buefy';
import VueMoment from 'vue-moment';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TranslateExampleItem from '@/components/translate/TranslateExampleItem';


const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(VueMoment);

describe('TranslateExampleItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TranslateExampleItem, {
      localVue,
      propsData: {
        id: 1,
        language: 'en',
        translateTo: 'pt',
        entities: [
          {
            start: 0,
            end: 0,
            entity: 'name',
          },
        ],
        repository: {
          entities: [],
        },
        created_at: '2018-04-30T12:32:37.848387Z',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
