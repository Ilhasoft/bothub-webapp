/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';

import NewEntity from '@/components-v1/inputs/EntitiesInput/NewEntity';
import store from '@/store';


const localVue = createLocalVue();
localVue.use(BH);

describe('NewEntity.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallowMount(NewEntity, {
      localVue,
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
        text: 'my name is douglas',
        debounceTime: 0,
      },
      store,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('enter in adding mode', () => {
    beforeEach(() => {
      wrapper.vm.enableAddingMode();
    });

    test('addingMode is true', () => {
      expect(wrapper.vm.addingMode).toBeFalsy();
    });

    describe('set textSelected', () => {
      beforeEach(() => {
        wrapper.setProps({
          textSelected: { start: 11, end: 18 },
        });
      });

      test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });

      describe('enter in adding mode', () => {
        beforeEach(async () => {
          wrapper.vm.enableAddingMode();
          await new Promise(r => setTimeout(r, 50));
        });

        test('addingMode is true', () => {
          expect(wrapper.vm.addingMode).toBeTruthy();
        });

        test('pristineLabel is null', () => {
          expect(wrapper.vm.pristineLabel).toBeNull();
        });

        describe('fill with valid data', () => {
          beforeEach(async () => {
            wrapper.vm.entity = 'name';
            await new Promise(r => setTimeout(r, 50));
          });

          test('pristineLabel is not null', () => {
            expect(wrapper.vm.pristineLabel).not.toBeNull();
          });

          describe('add entity', () => {
            beforeEach(() => {
              wrapper.vm.addEntity();
            });

            test('new event emitted', () => {
              expect(wrapper.emitted('new')).toBeDefined();
            });
          });

          describe('customize label', () => {
            const customLabelValue = 'character';

            beforeEach((() => {
              wrapper.vm.customizeLabel();
              wrapper.vm.currentLabel = customLabelValue;
            }));

            describe('add entity', () => {
              beforeEach(() => {
                wrapper.vm.addEntity();
              });

              test('new event emitted', () => {
                expect(wrapper.emitted('new')).toBeDefined();
              });

              test('has label in new event value', () => {
                const e = wrapper.emitted('new')[0][0];
                expect(e.label).toBe(customLabelValue);
              });
            });
          });
        });
      });
    });
  });

  describe('fillEdit', () => {
    describe('without customized label', () => {
      beforeEach(() => {
        wrapper.vm.fillEdit(
          { start: 11, end: 18, entity: 'name' },
          null,
          null,
        );
      });

      test('hasCustomizedLabel is false', () => {
        expect(wrapper.vm.hasCustomizedLabel).toBeFalsy();
      });
    });
  });

  describe('with customized label', () => {
    beforeEach(() => {
      wrapper.vm.fillEdit(
        { start: 11, end: 18, entity: 'name' },
        'person',
        null,
      );
    });

    test('hasCustomizedLabel is true', () => {
      expect(wrapper.vm.hasCustomizedLabel).toBeTruthy();
    });
  });
});
