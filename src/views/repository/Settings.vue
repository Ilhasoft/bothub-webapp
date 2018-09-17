<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div v-if="repository">
      <div
        v-if="repository"
        class="card">
        <div class="card-content">
          <h1 class="title is-4">Edit Repository</h1>
          <edit-repository-form
            :owner-nickname="repository.owner__nickname"
            :slug="repository.slug"
            :initial-data="getEditInitialData()"
            @edited="onEdited()" />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import EditProfileForm from '@/components-v1/user/EditProfileForm';
import EditRepositoryForm from '@/components-v1/repository/EditRepositoryForm';


const components = {
  RepositoryViewBase,
  EditProfileForm,
  EditRepositoryForm,
};

export default {
  name: 'RepositorySettings',
  components,
  extends: RepositoryBase,
  methods: {
    getEditInitialData() {
      const {
        name,
        slug,
        language,
        description,
        is_private: isPrivate,
      } = this.repository;
      return {
        name,
        slug,
        language,
        categories: this.repository.categories.map(
          ({ id, name: n }) => ({ value: id, display_name: n }),
        ),
        description,
        is_private: isPrivate,
      };
    },
    onEdited() {
      this.updateRepository();
      this.editModalOpen = false;
      this.$toast.open({
        message: 'Repository edited!',
        type: 'is-success',
      });
    },
  },
};
</script>
