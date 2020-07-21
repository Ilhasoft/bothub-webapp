<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
    <b-loading :active="submitting" />
    <form-generator
      v-if="formSchema && myProfile"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      :initial-data="initialData"
      :available-max-length="false"
      hide-help
      class="edit-field" />
    <form-generator
      v-if="groupSchema && myProfile"
      :schema="groupSchema"
      v-model="groupData"
      :errors="groupErrors"
      :grouped="true"
      :initial-data="initialData"
      :available-max-length="false"
      hide-help
      class="edit-field" />
    <div>
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
      groupSchema: null,
      data: {},
      groupData: {},
      submitting: false,
      errors: {},
      groupErrors: {},
      changePasswordModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'myProfile',
    ]),
    initialData() {
      const additional = this.myProfile && this.myProfile.nickname
        ? { image: `https://robohash.org/${this.myProfile.nickname}` }
        : {};
      return {
        ...additional,
        ...this.myProfile,
      };
    },
    allData() {
      return { ...this.data, ...this.groupData };
    },
  },
  async mounted() {
    this.formSchema = await this.getMyProfileSchema(this.myProfile.nickname);
    this.groupSchema = {
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
        await this.patchMyProfile(this.allData);
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

  .edit-field {
    margin-bottom: 2.313rem;
  }

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
