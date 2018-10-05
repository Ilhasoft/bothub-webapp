import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import applyFilters from '@/utils/filters';
import UpdateItem from '@/components/update/UpdateItem';


const localVue = createLocalVue();
localVue.use(BH);
applyFilters(localVue);

describe('UpdateList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(UpdateItem, {
      localVue,
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
        id: 1,
        language: 'en',
        created_at: '2018-09-26T18:19:42.379968Z',
        by: null,
        by__nickname: null,
        training_started_at: null,
        trained_at: null,
        failed_at: null,
        training_log: '',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('open modal', () => {
    beforeEach(() => {
      wrapper.vm.openLogModal();
    });

    test('logModalOpen is true', () => {
      expect(wrapper.vm.logModalOpen).toBeTruthy();
    });
  });
});
