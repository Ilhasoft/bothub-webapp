<template>
  <b-modal
    :active="active"
    @close="requestClose">
    <div
      v-if="active"
      class="card">
      <div class="card-content">
        <new-repository-form @created="closeAndRedirect" />
      </div>
    </div>
  </b-modal>
</template>

<script>
import NewRepositoryForm from '@/components/repository/NewRepositoryForm';


export default {
  name: 'NewRepositoryModal',
  components: {
    NewRepositoryForm,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    requestClose() {
      /* istanbul ignore next */
      this.$emit('requestClose');
    },
    closeAndRedirect(repository) {
      /* istanbul ignore next */
      this.requestClose();

      /* istanbul ignore next */
      this.$router.push({
        name: 'repository-home',
        params: {
          ownerNickname: repository.owner__nickname,
          slug: repository.slug,
        },
      });
    },
  },
};
</script>
