<template>
  <bh-modal :open.sync="openValue">
    <div class="bh-grid bh-grid--column">
      <div class="bh-grid__item">
        <h1>Request Authorization</h1>
      </div>
      <request-authorization-form
        :repository-uuid="repositoryUuid"
        class="bh-grid__item"
        @requested="onAuthorizationRequested()" />
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
