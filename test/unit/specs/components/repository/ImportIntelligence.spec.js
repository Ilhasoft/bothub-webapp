import { shallowMount, createLocalVue } from '@vue/test-utils';
import ImportIntelligence from '@/components/repository/ImportIntelligence';
import store from '@/store';

const localVue = createLocalVue();

describe('ImportIntelligence', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ImportIntelligence, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        intelligenceFile: null,
        importModalVisible: false,
        migrateModalVisible: false,
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('set visible import modal', () => {
    beforeEach(() => {
      const setVisibleImport = wrapper.find({ ref: 'setVisibleImport' });
      setVisibleImport.trigger('click');
    });
    test('import modal should be visible', () => {
      expect(wrapper.vm.importModalVisible).toBeTruthy();
    });
  });
  describe('set visible migrate modal', () => {
    beforeEach(() => {
      const setVisibleMigrate = wrapper.find({ ref: 'setVisibleMigrate' });
      setVisibleMigrate.trigger('click');
    });
    test('migrate modal should be visible', () => {
      expect(wrapper.vm.migrateModalVisible).toBeTruthy();
    });
  });
});
