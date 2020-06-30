<template>
  <form-generator
    :schema="schema"
    v-model="data"/>
</template>

<script>
import FormGenerator from '@/components/form-generator/FormGenerator';

export default {
  name: 'EditProfile',
  components: {
    FormGenerator,
  },
  data() {
    return {
      data: {},
      schema: {
        email: {
          label: 'Email',
          read_only: false,
          required: false,
          style: Object,
          type: 'email',
        },
        name: {
          label: 'Name',
          read_only: false,
          required: false,
          style: Object,
          type: 'string',
        },
        nickname: {
          label: 'Nickname',
          read_only: false,
          required: false,
          style: Object,
          type: 'string',
        },
        localization: {
          label: 'Localization',
          read_only: false,
          required: false,
          style: Object,
          type: 'string',
        },
        biography: {
          label: 'Biography',
          read_only: false,
          required: false,
          style: Object,
          type: 'textarea',
        },
      },
    };
  },
};
</script>
