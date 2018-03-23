import { shallow } from '@vue/test-utils';
import Modal from '@/components/shared/Modal';

describe('Modal.vue', () => {
  it('.content exists', () => {
    const wrapper = shallow(Modal);
    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
