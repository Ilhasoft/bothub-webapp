<template>
  <form @submit="onSubmit">
    <field
      label="E-mail"
      help-text="Type your e-mail"
    >
      <email-input
        is-required
        v-model="data.username"
      />
    </field>
    <field
      label="Password"
    >
      <text-input
        type="password"
        is-required
        :max-length=16
        v-model="data.password"
      />
    </field>
    <p>{{ data }}</p>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import Field from '@/components/shared/form/Field';
import EmailInput from '@/components/shared/form/inputs/EmailInput';
import TextInput from '@/components/shared/form/inputs/TextInput';

const components = {
  Field,
  EmailInput,
  TextInput,
};

export default {
  name: 'LoginForm',
  components,
  data() {
    return {
      data: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit('submit');
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: block;
  margin: 0;
  padding: 0;
}
</style>
