<template>
  <bh-modal
    :open.sync="openValue"
    title="Request Authorization">
    <div class="bh-grid">
      <div class="bh-grid__item">
        <request-authorization-form
          :repository-uuid="repositoryUuid"
          @requested="onAuthorizationRequested()" />
      </div>
    </div>
  </bh-modal>
</template>

<script>
import RequestAuthorizationForm from '@/components/repository/RequestAuthorizationForm';


export default {
  name: 'RequestAuthorizationModal',
  components: {
    RequestAuthorizationForm,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    repositoryUuid: {
      type: String,
      required: true,
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
