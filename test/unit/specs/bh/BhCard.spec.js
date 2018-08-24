import { shallowMount, createLocalVue } from '@vue/test-utils';
import { compileToFunctions } from 'vue-template-compiler';
import BH from 'bh';
import BhCard from 'bh/components/BhCard';


const localVue = createLocalVue();
localVue.use(BH);
const pComponentContent = compileToFunctions('<div class="bh-card__left__content__flex-display"><span>Teste Slot content </span> </div>');

describe('BhCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhCard, {
      localVue,
      slots: {
        default: pComponentContent,
        append: pComponentContent,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
