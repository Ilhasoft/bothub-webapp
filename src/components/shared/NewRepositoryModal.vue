<template>
  <b-modal
    active
    @close="requestClose">
    <div class="card">
      <div class="card-content">
        <new-repository-form @created="closeAndRedirect" />
      </div>
    </div>
  </b-modal>
</template>

<script>
import NewRepositoryForm from '@/components/repository/NewRepositoryForm';

const components = {
  NewRepositoryForm,
};

export default {
  name: 'NewRepositoryModal',
  components,
  methods: {
    requestClose() {
      /* istanbul ignore next */
      this.$emit('requestClose');
    },
    closeAndRedirect() {
      /* istanbul ignore next */
      this.requestClose();
      // TODO: redirect to repository route - use arg[0].uuid
    },
  },
};
</script>

