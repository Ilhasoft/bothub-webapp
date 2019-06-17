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
        availableAddLabel: true,
      },
      stubs: {
        EntityForm,
      },
    });
  });

  const findAddEntityButton = () => wrapper.find({ref: 'addEntityBtn'});
  const addEntity = () => findAddEntityButton().find('button').trigger('click');
  const findEntityForm = (index) => {
    return wrapper.findAll(EntityForm).at(index);
  };

  const findAddLabelButtonForEntityFormOnIndex = (index) =>
    findEntityForm(index).find({ref: 'addLabelButton'});

  const clickOnAddLabelButtonAtEntityFormOfIndex = (index) => {
    findAddLabelButtonForEntityFormOnIndex(index)
      .find('button')
      .trigger('click');
  };

  const fillLabelOnEntityFormAtIndex = (index, label) => {
    findEntityForm(index)
      .vm.$emit('labelChanged', label);
  };


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
    expect(wrapper.vm.entities[0].localLoadingLabel).toBe(true);
    expect(wrapper.emitted('entityAdded').length).toBe(1);
  });

  // Could not test this.
  // it('adds label to an entity');

  it('shows existing label of an entity', async (done) => {
    wrapper.setProps({
      text: '000aaaa000',
      textSelected: {
        start: 3,
        end: 7,
      },
    });

    wrapper.setMethods({
      getEntities: () => {
        return Promise.resolve({
          next: () => Promise.resolve(),
          items: [
            {
              data: {
                label: "lorem",
              },
            },
          ],
        });
      },
    });

    addEntity();

    await localVue.nextTick();
    await localVue.nextTick();

    expect(wrapper.vm.entities[0].label).toBe('lorem');
    expect(findAddLabelButtonForEntityFormOnIndex(0).text()).toBe('Edit "lorem" label');

    done();
  });

  xit('removes label from an entity');
  xit('updates label of an entity');
  xit('removes an entity');
  xit('renames an entity');
});
