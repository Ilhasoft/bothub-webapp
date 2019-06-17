import { mount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import sinon from 'sinon';

import EntitiesInput from '@/components/inputs/EntitiesInput';
import EntityForm from '@/components/inputs/EntitiesInput/EntityForm';

const localVue = createLocalVue();
localVue.use(BH);

describe('EntitiesInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(EntitiesInput, {
      localVue,
      propsData: {
        repository: {},
        text: 'my name is douglas',
      },
      stubs: {
        EntityForm: EntityForm,
      },
    });
  });

  const findAddEntityButton = () => wrapper.find({ref: 'addEntityBtn'});
  const addEntity = () => findAddEntityButton().find('button').trigger('click');

  it('add entity button is disabled when nothing is selected', () => {
    const btn = findAddEntityButton();

    expect(btn.exists()).toBe(true);
    expect(btn.text().includes('Add entity')).toBe(true);
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

  it('adds an entity', () => {
    wrapper.setProps({
      text: '000aaaa000',
      textSelected: {
        start: 3,
        end: 7,
      },
    });

    const getEntitiesStub = sinon.stub();

    wrapper.setMethods({
      getEntities: getEntitiesStub,
    });

    addEntity();

    expect(getEntitiesStub.called).toBe(true);
    expect(wrapper.vm.entities.length).toBe(1);
    expect(wrapper.emitted('entityAdded').length).toBe(1);
  });

  xit('adds label to an entity');
  xit('shows existing label of an entity');
  xit('removes label from an entity');
  xit('updates label of an entity');
  xit('removes an entity');
  xit('renames an entity');
});
