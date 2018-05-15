import { shallow } from '@vue/test-utils';
import Loading from '@/components/shared/Loading';


describe('Loading.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(Loading);
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
