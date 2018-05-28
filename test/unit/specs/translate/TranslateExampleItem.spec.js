import Buefy from 'buefy';
import VueMoment from 'vue-moment';
import { shallow, createLocalVue } from '@vue/test-utils';
import TranslateExampleItem from '@/components/translate/TranslateExampleItem';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(VueMoment);


describe('TranslateExampleItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(TranslateExampleItem, {
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
        created_at: '2018-04-30T12:32:37.848387Z',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
