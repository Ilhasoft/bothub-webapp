<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <b-modal
      :width="500"
      :active.sync="isNewVersionModalActive"
      class="repository-new-version-modal"
      trap-focus
      aria-role="dialog"
      aria-modal>
      <repository-handle-version-modal
        :repository="repository"
        :version="selectedVersion"
        @close="isNewVersionModalActive = false"
        @error="showError"
        @addedVersion="onAddedVersion()"/>
    </b-modal>

    <div class="versions">
      <div class="version__header">
        <div class="version__header__title__wrapper">
          <h2>Versions</h2>
        </div>
        <p> Add, edit and choose versions of your bot intelligence. </p>
      </div>
      <section>
        <b-table
          :data="data"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
        >
          <template slot-scope="props">
            <b-table-column
              field="id"
              label="version"
              width="40"
              sortable
              centered
              numeric>
              <b-field v-if="isEdit.edit === true && isEdit.id === props.row.id">
                <div class="versions__edit-input">
                  <b-input
                    v-model="isEdit.name"
                    :value="isEdit.name"
                    @keyup.enter.native="handleEditVersion(isEdit.name, props.row.id)"/>
                  <b-icon
                    icon="close"
                    size="is-small"
                    @click.native="isEdit.edit = false"/>
                </div>
              </b-field>
              <span
                v-else
                class="versions__table__version-number">
                {{ props.row.name }}
              </span>
            </b-table-column>
            <b-table-column
              centered
              field="last_update"
              label="Last update"
              sortable >
              {{ props.row.last_update | moment('from') }}
            </b-table-column>
            <b-table-column
              centered
              field="created_at"
              label="Date Created"
              sortable >
              {{ props.row.created_at | moment('from') }}
            </b-table-column>
            <b-table-column
              centered
              width="180"
              label="">
              <div class="versions__table__buttons-wrapper">
                <b-button
                  :type="props.row.is_default ? 'is-primary': 'is-light'"
                  class="is-small"
                  rounded
                  @click="handleDefaultVersion(props.row.id, props.row.name)">Main</b-button>
                <b-icon
                  icon="pencil"
                  @click.native="onEditVersion({id: props.row.id, name: props.row.name})"/>
                <b-icon
                  icon="delete"
                  @click.native="onDeleteVersion(props.row.id, props.row.is_default)"/>
                <b-icon
                  icon="content-copy"
                  @click.native="copyVersion(props.row)"/>
              </div>
            </b-table-column>
          </template>
        </b-table>
      </section>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryHandleVersionModal from '@/components/repository/RepositoryHandleVersionModal';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryVersions',
  components: {
    RepositoryViewBase,
    RepositoryHandleVersionModal,
  },
  extends: RepositoryBase,
  data() {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,
      versions: [],
      isEdit: {},
      isNewVersionModalActive: false,
      selectedVersion: null,
    };
  },
  mounted() {
    this.updateVersions();
  },
  methods: {
    ...mapActions([
      'getVersions',
      'setRepositoryVersion',
      'setDefaultVersion',
      'deleteVersion',
      'editVersion',
    ]),

    async updateVersions() {
      const response = await this.getVersions(this.repository.uuid);
      this.data = response.data.results;
    },
    handleDefaultVersion(id, name) {
      this.$buefy.dialog.confirm({
        title: 'Change default version',
        message: 'Are you sure you want to change this default version?',
        confirmText: 'Change default',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: () => this.setDefaultVersion({
          repositoryUuid: this.repository.uuid,
          id,
          name,
        }).then(() => this.updateVersions()),
      });
    },
    onEditVersion(version) {
      const { id, name } = version;
      this.isEdit = {
        edit: true,
        id,
        name,
      };
    },
    handleEditVersion(name, id) {
      this.editVersion({
        repositoryUuid: this.repository.uuid,
        id,
        name,
      }).then(() => {
        this.$buefy.toast.open({
          message: 'Version was edited',
          type: 'is-success',
        });
        this.isEdit = false;
        this.updateVersions();
      }).catch(() => {
        this.$buefy.toast.open({
          message: 'Something wrong ):',
          type: 'is-danger',
        });
      });
    },
    copyVersion(version) {
      this.selectedVersion = version;
      this.isNewVersionModalActive = true;
    },
    onAddedVersion() {
      this.isNewVersionModalActive = false;
      this.$buefy.toast.open({
        message: 'Version was created',
        type: 'is-success',
      });
      this.updateVersions();
    },
    onDeleteVersion(id, isDefault) {
      if (isDefault) {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'You cannot delete the main branch',
          position: 'is-top',
          type: 'is-danger',
        });
      } else {
        this.$buefy.dialog.confirm({
          title: 'Deleting Version',
          message: 'Are you sure you want to delete this version? This action cannot be undone.',
          confirmText: 'Delete Version',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteVersion(id)
            .then(() => this.updateVersions()),
        });
      }
    },
    showError(error) {
      // TODO: Treat errors
      this.$buefy.toast.open({
        message: error.response.data,
        type: 'is-danger',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~@/assets/scss/utilities.scss';
@import '~bh/src/assets/scss/variables.scss';

.versions {
  margin: auto;
  max-width: $max-repository-card-width;

  &__header {
    margin: 3.875rem 0 2.75rem 0;

    &__title {
      &__wrapper {
        display: flex;
        align-items: flex-start;
      }
    }

    &__button {
      font-weight: bold;
      margin: 0 1rem;
    }
  }

  &__edit-input {
    display: flex;
    align-items: center;

    span {
      cursor: pointer;
      margin-left: .5rem;
    }
  }

  &__table {
    &__version-number {
      color: $primary;
      font-weight: bold;
      cursor: pointer;
    }

    &__buttons-wrapper {
      display: flex;
      justify-content: space-between;
      color: $color-grey-dark;

      span {
        cursor: pointer;
      }
    }
  }
}
</style>
