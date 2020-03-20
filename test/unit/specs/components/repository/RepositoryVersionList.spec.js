import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import RepositoryVersionList from '@/components/repository/RepositoryVersionList';


const localVue = createLocalVue();
localVue.use(Buefy);

const methods = {
  updateVersions: jest.fn(),
  updateParams: jest.fn(),
  onEditVersion: jest.fn(),
  copyVersion: jest.fn(),
  onDeleteVersion: jest.fn(),
};

describe('RepositoryVersionList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryVersionList, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
      methods,
      propsData: {
        repository: { uuid: 'repository_uuid' },
        canEdit: true,
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
