import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EntitiesList from '@/components/repository/EntitiesList';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('EntitiesList.vue', () => {
  let wrapper;
  let store;
  let getters;
  beforeEach(() => {
    const entity = 'health';
    getters = {
      getCurrentRepository: () => ({
        groups: [
          { entities: ['green_robot'] },
        ],
      }),
    };
    store = new Vuex.Store({
      modules: {
        Repository: {
          getters,
        },
      },
    });
    wrapper = shallowMount(EntitiesList, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
        $route: {
          params: { entity },
        },
      },
      propsData: {
        entitiesList: {
          total: 10,
        },
        entityName: {
          entity: 'health',
        },
        repository: {
          other_group: {
            entities: ['robot', 'greenRobot'],
          },
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('click on edit button', () => {
    beforeEach(() => {
      const editEntityEvent = wrapper.find({ ref: 'editEntityEvent' });
      editEntityEvent.trigger('click');
    });

    test('expanded should be truth', () => {
      expect(wrapper.vm.EditSentences).toBeTruthy();
    });

    test('total of sentences should be greater than 0', () => {
      expect(wrapper.vm.entityName.entity).toBeDefined();
    });

    test('total of sentences should be greater than 0', () => {
      expect(wrapper.vm.entitiesList.total).toBeGreaterThan(0);
    });
  });
});
