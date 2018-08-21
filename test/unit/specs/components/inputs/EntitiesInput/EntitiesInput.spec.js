import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';

import EntitiesInput from '@/components-v1/inputs/EntitiesInput';


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

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('newEntity emit new event', () => {
    let newEntity;
    const entity = {
      start: 11,
      end: 18,
      entity: 'name',
    };

    beforeEach(() => {
      newEntity = wrapper.find({ ref: 'newEntity' });
      newEntity.vm.$emit('new', entity);
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('new event emitted by newEntity', () => {
      expect(newEntity.emitted('new')).toBeDefined();
    });

    test('entity added to entities', () => {
      expect(wrapper.vm.entities).toHaveLength(1);
    });

    test('input event emitted', () => {
      expect(wrapper.emitted('input')).toBeDefined();
    });

    describe('change text to "the name is douglas"', () => {
      beforeEach(() => {
        wrapper.setProps({ text: 'the name is douglas' });
      });

      test('update entity position', () => {
        const e = wrapper.vm.entities[0];
        expect(e.start).toBe(12);
        expect(e.end).toBe(19);
      });
    });

    describe('change text to "my name is"', () => {
      beforeEach(() => {
        wrapper.setProps({ text: 'the name is' });
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });

      test('entity deleted', () => {
        expect(wrapper.vm.entities).toHaveLength(0);
      });
    });

    describe('remove entity', () => {
      beforeEach(() => {
        wrapper.vm.removeEntity(entity);
      });

      test('entity deleted', () => {
        expect(wrapper.vm.entities).toHaveLength(0);
      });
    });

    describe('edit entity', () => {
      beforeEach(async () => {
        await wrapper.vm.editEntity(entity);
      });

      test('entity deleted', () => {
        expect(wrapper.vm.entities).toHaveLength(0);
      });
    });
  });
});
