/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';


const localVue = createLocalVue();

describe('ResetPasswordForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(
      ResetPasswordForm,
      {
        store,
        localVue,
        mocks: {
          $t: () => 'some specific text',
        },
        propsData: {
          nickname: 'fake',
          token: 'token1',
        },
      },
    );
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('fill password with valid data', () => {
    beforeEach(() => {
      wrapper.vm.data.password = 'n123456';
    });

    describe('submit form', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
        await wrapper.vm.onSubmit();
      });

      test('return true', () => {
        expect(r).toBeTruthy();
      });

      test('emit reseted event', () => {
        expect(wrapper.emitted('reseted')).toBeDefined();
      });

      // test('show success msg', () => {
      //   expect(wrapper.vm.msgs.filter(
      //     msg => (msg.class === 'success'),
      //   )).toHaveLength(1);
      // });
    });

    describe('pass invalid token', () => {
      beforeEach(() => {
        wrapper.setProps({ token: 'invalid_token' });
      });

      describe('submit form', () => {
        let r;
        beforeEach(async () => {
          r = await wrapper.vm.onSubmit();
        });

        test('return false', () => {
          expect(r).toBeFalsy();
        });
      });
    });
  });

  describe('fill password with invalid data', () => {
    beforeEach(() => {
      wrapper.vm.data.password = '';
    });

    describe('submit form', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return false', () => {
        expect(r).toBeFalsy();
      });
    });
  });
});
