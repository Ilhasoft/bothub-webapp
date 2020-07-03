<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
    <b-loading :active="submitting" />
    <form-generator
      v-if="formSchema && myProfile"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      :initial-data="myProfile"
      class="field" />
    <div class="field">
      <a @click="openChangePasswordModal()">
        {{ $t('webapp.my_profile.change_password') }} </a>
      <div class="control has-text-centered">
        <b-button
          :disabled="submitting"
          native-type="submit"
          type="is-primary"
          class="submit-button">{{ $t('webapp.my_profile.edit') }}</b-button>
      </div>
    </div>
    <b-modal
      :width="489"
      :active.sync="changePasswordModalOpen">
      <div class="change-password">
        <h1>{{ $t('webapp.my_profile.modal_change_password') }}</h1>
        <change-password-form @changed="onPasswordChanged()" />
      </div>
    </b-modal>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import ChangePasswordForm from '@/components/user/ChangePasswordForm';

const components = {
  FormGenerator,
  Loading,
  ChangePasswordForm,
};

export default {
  name: 'EditProfileForm',
  components,
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
      changePasswordModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'myProfile',
    ]),
  },
  async mounted() {
    const formSchema = await this.getMyProfileSchema(this.myProfile.nickname);
    const additionalSchema = {
      biography: {
        label: 'Biography',
        read_only: false,
        style: { grouped: true },
        type: 'textarea',
      },
      image: {
        label: 'Avatar',
        read_only: false,
        style: { grouped: true },
        type: 'image',
      },
    };
    this.formSchema = { ...formSchema, ...additionalSchema };
  },
  methods: {
    ...mapActions([
      'updateMyProfile',
      'getMyProfileSchema',
      'patchMyProfile',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};
      try {
        await this.patchMyProfile(this.data);
        this.$emit('edited');
        this.updateMyProfile();
        this.submitting = false;
        return true;
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
      }
      this.submitting = false;
      return false;
    },
    openChangePasswordModal() {
      this.changePasswordModalOpen = true;
    },
    onPasswordChanged() {
      this.$bhToastNotification({
        message: 'Password changed!',
        type: 'success',
      });
      this.changePasswordModalOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .change-password {
    background-color: white;
    padding: 3rem;
    border-radius: 8px;
  }

  .submit-button {
    margin-top: 3.1rem;
    padding: 0 3rem
  }
</style>
