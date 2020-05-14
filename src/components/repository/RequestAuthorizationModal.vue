<template>
  <b-modal
    :active.sync="openValue"
    :width="700">
    <div class="request-authorization">
      <h1 class="request-authorization__item">{{ $t('webapp.layout.request_authorization') }}</h1>
      <request-authorization-form
        :repository-uuid="repositoryUuid"
        @requested="onAuthorizationRequested()" />
    </div>
  </b-modal>
</template>

<script>
import RequestAuthorizationForm from '@/components/repository/RequestAuthorizationForm';


export default {
  name: 'RequestAuthorizationModal',
  components: {
    RequestAuthorizationForm,
  },
  props: {
    repositoryUuid: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openValue: this.open,
    };
  },
  watch: {
    open(value) {
      this.openValue = value;
    },
    openValue(value) {
      this.$emit('update:open', value);
    },
  },
  methods: {
    onAuthorizationRequested() {
      this.$emit('requestDispatched');
    },
  },
};
</script>

<style lang="scss" scoped>
  .request-authorization {
    background-color: white;
    padding: 2rem;

    &__item {
      margin: 1rem 0;
    }
  }
</style>
