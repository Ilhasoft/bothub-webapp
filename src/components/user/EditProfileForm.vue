<template>
  <form @submit.prevent="onSubmit">
    <loading v-if="!formSchema" />
    <form-generator
      v-if="formSchema && myProfile"
      :schema="formSchema"
      v-model="data"
      :errors="errors"
      :initial-data="myProfile"
      class="field" />
    <div class="field">
      <router-link to="recoverpassword"> {{ $t('webapp.my_profile.change_password') }} </router-link>
      <div class="control has-text-centered">
        <button
          :disabled="submitting"
          type="submit"
          class="button is-primary">{{ $t('webapp.my_profile.edit') }}</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';


const components = {
  FormGenerator,
  Loading,
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
    };
  },
  computed: {
    ...mapGetters([
      'myProfile',
    ]),
  },
  async mounted() {
    const formSchema = await this.getMyProfileSchema(this.myProfile.nickname);
    const imageSchema = {
      label: 'Image',
      read_only: false,
      style: {},
      type: 'image',
    };
    this.formSchema = { ...formSchema, imageSchema };
  },
  methods: {
    ...mapActions([
      'getMyProfileSchema',
      'patchMyProfile',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};
      try {
        await this.patchMyProfile(this.data);
        this.$emit('edited');
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
  },
};
</script>
