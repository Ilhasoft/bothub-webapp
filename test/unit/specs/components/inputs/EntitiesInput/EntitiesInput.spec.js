import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';

import EntitiesInput from '@/components/inputs/EntitiesInput';


const localVue = createLocalVue();
localVue.use(BH);

describe('EntitiesInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EntitiesInput, {
      localVue,
      propsData: {
        repository: {},
        text: 'my name is douglas',
      },
    });
  });

  const findAddEntityButton = () => wrapper.find({ref: 'addEntityBtn'});

  it('add entity button is disabled when nothing is selected', () => {
    const btn = findAddEntityButton();

    expect(btn.exists()).toBe(true);
    expect(btn.text()).toBe('Add entity');
    expect(btn.props('disabled')).toBe(true);
  });

  it('add entity button enables when some text is selected', () => {
    wrapper.setProps({
      text: '000aaaa000',
      textSelected: {
        start: 3,
        end: 7,
      },
    });

    const btn = findAddEntityButton();

    expect(btn.text()).toBe('Add entity for "aaaa"');
    expect(btn.props('disabled')).toBe(false);
  });

  xit('adds an entity');
  xit('adds label to an entity');
  xit('shows existing label of an entity');
  xit('removes label from an entity');
  xit('updates label of an entity');
  xit('removes an entity');
  xit('renames an entity');
});
