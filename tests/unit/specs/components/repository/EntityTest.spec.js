import { shallowMount, createLocalVue } from '@vue/test-utils';
import EntityEdit from '@/components/repository/EntityEdit';
import store from '@/store';

const localVue = createLocalVue();

describe('EntityEdit', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(EntityEdit, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
        $tc: () => 'some specific text',
      },
      propsData: {
        groups: [
          { group_id: 25, value: 'Animal', entities: [{ entity_id: 33, value: 'cat' }, { entity_id: 36, value: 'badger' }, { entity_id: 43, value: 'possum' }] },
          { group_id: 66, value: 'Flower', entities: [{ entity_id: 64, value: 'amelia' }, { entity_id: 69, value: 'daisy' }, { entity_id: 24, value: 'dandelion' }] },
        ],
        ungrouped: [
          { group_id: 78, value: 'car' }, { entity_id: 54, value: 'disease' }, { entity_id: 55, value: 'my_leg' },
        ],
        canEdit: true,
        repositoryUuid: '123abc',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('editing button works', () => {
    beforeEach(() => {
      const editButton = wrapper.find({ ref: 'editButton' });
      editButton.trigger('click');
    });
    test('editing mode activates correctly', () => {
      expect(wrapper.find({ ref: 'editButton' })).toBeTruthy();
    });
  });
});
