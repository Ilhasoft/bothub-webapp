import { shallow } from '@vue/test-utils';
import FlagsList from '@/components/shared/FlagsList';


describe('FlagsList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(FlagsList, {
      propsData: {
        languages: ['en', 'pt'],
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
