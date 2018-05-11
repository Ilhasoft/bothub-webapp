import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';
import EntitiesAsBadges from '@/components/example/form/EntitiesAsBadges';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('EntitiesAsBadges.vue', () => {
  let wrapper;
  const selected = {
    start: 11,
    end: 18,
  };
  beforeEach(() => {
    wrapper = shallow(EntitiesAsBadges, {
      localVue,
      propsData: {
        text: 'my name is douglas',
        selected,
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('start adding', () => {
    beforeEach(() => {
      const addBtn = wrapper.find({ ref: 'addBtn' });
      addBtn.trigger('click');
    });

    test('adding exist', () => {
      expect(wrapper.vm.adding.start).toBe(selected.start);
      expect(wrapper.vm.adding.end).toBe(selected.end);
    });

    describe('type entity name', () => {
      const addingEntity = 'name';
      beforeEach(() => {
        const addingInput = wrapper.find({ ref: 'addingInput' });
        addingInput.vm.$emit('input', addingEntity);
      });

      test('adding entity is same', () => {
        expect(wrapper.vm.adding.entity).toBe(addingEntity);
      });

      describe('submit and add', () => {
        beforeEach(() => {
          wrapper.vm.confirmAdding();
        });

        test('has item in entities', () => {
          expect(wrapper.vm.entities.length).toBe(1);
        });

        describe('change text', () => {
          describe('erase start', () => {
            beforeEach(() => {
              wrapper.setProps({ text: 'name is douglas' });
            });

            test('entity changed', () => {
              const { start, end } = wrapper.vm.entities[0];
              expect(start).toBe(8);
              expect(end).toBe(15);
            });
          });

          describe('erase entity', () => {
            beforeEach(() => {
              wrapper.setProps({ text: 'my name is dougla' });
            });

            test('entity deleted', () => {
              expect(wrapper.vm.entities.length).toBe(0);
            });
          });

          describe('two entities with same value', () => {
            beforeEach(() => {
              wrapper.setProps({ text: 'my name is douglas, your name is douglas too' });
              wrapper.vm.entities.push({
                start: 33,
                end: 40,
                entity: 'name',
              });
            });

            describe('erase start', () => {
              beforeEach(() => {
                wrapper.setProps({ text: 'name is douglas, your name is douglas too' });
              });

              test('entity one changed', () => {
                const { start, end } = wrapper.vm.entities[0];
                expect(start).toBe(8);
                expect(end).toBe(15);
              });

              test('entity two changed', () => {
                const { start, end } = wrapper.vm.entities[1];
                expect(start).toBe(30);
                expect(end).toBe(37);
              });
            });
          });
        });

        describe('remove entity', () => {
          beforeEach(() => {
            wrapper.vm.remove(0);
          });

          test('item removed from entities', () => {
            expect(wrapper.vm.entities.length).toBe(0);
          });
        });
      });

      describe('cancel', () => {
        beforeEach(() => {
          wrapper.vm.cancelAdding();
        });

        test('adding is false', () => {
          expect(wrapper.vm.adding).toBeFalsy();
        });
      });
    });
  });
});
