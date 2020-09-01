import { mount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import sinon from 'sinon';
import Buefy from 'buefy';

import EntitiesInput from '@/components/inputs/EntitiesInput';
import EntityForm from '@/components/inputs/EntitiesInput/EntityForm';

const localVue = createLocalVue();
localVue.use(BH);
localVue.use(Buefy);

describe('EntitiesInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(EntitiesInput, {
      localVue,
      mocks: {
        $t: () => 'Add entity for',
      },
      propsData: {
        repository: {},
        text: 'my name is douglas',
        availableAddLabel: true,
      },
      stubs: {
        EntityForm,
      },
    });
  });

  const findAddEntityButton = () => wrapper.find({ ref: 'addEntityBtn' });
  const addEntity = () => findAddEntityButton().find('button').trigger('click');
  const findEntityForm = index => wrapper.findAll(EntityForm).at(index);

  it('add entity button is disabled when nothing is selected', () => {
    const btn = findAddEntityButton();

    expect(btn.exists()).toBe(true);
    expect(btn.text().includes('Add entity')).toBe(true);
    expect(btn.attributes('disabled')).toBe('disabled');
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
    expect(btn.attributes('disabled')).not.toBe('disabled');
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
    expect(getEntitiesStub.called).toBeDefined();
    expect(wrapper.vm.entities.length).toBe(1);
    expect(wrapper.emitted('entityAdded').length).toBe(1);
  });

  it('removes an entity', async (done) => {
    wrapper.setProps({
      text: '000aaaa000',
      textSelected: {
        start: 3,
        end: 7,
      },
    });

    wrapper.setMethods({
      getEntities: () => Promise.resolve({
        next: () => Promise.resolve(),
        items: [
          {
            data: {
              label: 'lorem',
            },
          },
        ],
      }),
    });

    addEntity();

    await localVue.nextTick();
    await localVue.nextTick();

    findEntityForm(0).vm.$emit('removeEntity');

    expect(wrapper.vm.entities.length).toBe(0);

    done();
  });

  // TODO: implement these cases.
  // it('renames an entity');
});
