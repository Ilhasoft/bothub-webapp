<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <b-modal
      :active.sync="isNewVersionModalActive"
      class="repository-new-version-modal"
      trap-focus
      aria-role="dialog"
      aria-modal>
      <repository-new-version-modal
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
          :backend-pagination="true"
          :total="count"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          backend-sorting
          @sort="sort"
        >
          <template slot-scope="props">
            <b-table-column
              field="name"
              label="version"
              width="100"
              sortable
              centered
              numeric>
              <div
                v-if="currentEditVersion && currentEditVersion.id==props.row.id"
                class="field">
                <div class="control has-icons-right">
                  <input
                    :class="['input', 'is-focused', loadingEdit ? 'is-loading' : '']"
                    v-model="editName"
                    type="text"
                    @blur="clearEdit()"
                    @keyup.enter="submitEdit()">
                  <span class="icon is-small is-right">
                    <b-icon
                      icon="close"
                      @click.native.stop.prevent.capture="clearEdit()"/>
                  </span>
                </div>
              </div>
              <span
                v-else
                class="versions__table__version-number"
                @click="handleVersion(props.row.id, props.row.name)">
                {{ props.row.name }}
              </span>
            </b-table-column>
            <b-table-column
              centered
              field="created_at"
              label="Date Created"
              sortable>
              {{ props.row.created_at | moment('from') }}
            </b-table-column>
            <b-table-column
              centered
              field="last_update"
              label="Last Modified"
              sortable>
              {{ props.row.last_update | moment('from') }}
            </b-table-column>
            <b-table-column
              centered
              field="created_by"
              label="Created by"
              sortable>
              {{ props.row.created_by }}
            </b-table-column>
            <b-table-column
              centered
              width="180"
              field="is_default"
              label=""
              sortable>
              <div class="versions__table__buttons-wrapper">
                <b-icon
                  icon="content-copy"
                  @click.native="copyVersion(props.row)" />
                <b-button
                  :type="props.row.is_default ? 'is-primary': 'is-light'"
                  class="is-small"
                  rounded
                  @click="makeDefault(props.row)">Main</b-button>
                <b-icon
                  icon="pencil"
                  @click.native="openEditVersion(props.row)"/>
                <b-icon
                  icon="delete"
                  @click.native="openDeleteVersion(props.row)"/>
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
import RepositoryBase from './Base';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryNewVersionModal from '@/components/repository/RepositoryNewVersionModal';


export default {
  name: 'RepositoryVersions',
  components: {
    RepositoryViewBase,
    RepositoryNewVersionModal,
  },
  extends: RepositoryBase,
  data() {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,
      count: 0,
      versions: [],
      isNewVersionModalActive: false,
      selectedVersion: null,
      orderField: 'is_default',
      asc: false,
      currentEditVersion: null,
      editName: null,
      loadingEdit: false,
    };
  },
  watch: {
    currentPage() {
      this.updateVersions();
    },
  },
  mounted() {
    this.updateVersions();
  },
  methods: {
    ...mapActions([
      'getVersions',
      'setRepositoryVersion',
      'deleteVersion',
      'editVersion',
      'makeVersionDefault',
    ]),
    sort(orderField, asc) {
      this.orderField = orderField;
      this.asc = asc === 'asc';
      this.updateVersions();
    },
    async updateVersions() {
      const response = await this.getVersions(
        {
          repositoryUUID: this.repository.uuid,
          orderField: this.orderField,
          asc: this.asc,
          limit: this.perPage,
          offset: this.perPage * (this.currentPage - 1),
        },
      );
      this.data = response.data.results;
      this.count = response.data.count;
    },
    handleVersion(id, name) {
      this.setRepositoryVersion({
        id,
        name,
      }).then(() => { this.updateVersions(); });
    },
    openEditVersion(version) {
      this.editName = version.name;
      this.currentEditVersion = version;
    },
    clearEdit() {
      this.currentEditVersion = null;
      this.editName = null;
      this.loadingEdit = false;
    },
    submitEdit() {
      if (!this.currentEditVersion
        || !this.editName
        || this.currentEditVersion.name === this.editName) {
        this.clearEdit();
        return;
      }
      this.loadingEdit = true;
      this.editVersion({
        repositoryUUID: this.repository.uuid,
        versionUUID: this.currentEditVersion.id,
        name: this.editName,
      }).then(() => {
        this.updateVersions();
        this.clearEdit();
      }).onError(() => {
        this.clearEdit();
      });
    },
    makeDefault(version) {
      if (version.is_default) return;

      this.makeVersionDefault({
        repositoryUUID: this.repository.uuid,
        versionUUID: version.id,
      }).then(() => {
        this.clearEdit();
        this.updateVersions();
      });
    },
    onDeletionConfirm(version) {
      this.deleteVersion({
        repositoryUUID: this.repository.uuid,
        versionUUID: version.id,
      }).then(() => {
        this.$buefy.toast.open({
          message: 'Version was deleted',
          type: 'is-success',
        });
        this.updateVersions();
      }).onError(() => {
        this.$buefy.toast.open({
          message: 'An error occurred',
          type: 'is-danger',
        });
      });
    },
    openDeleteVersion(version) {
      this.$buefy.dialog.confirm({
        message: 'Are you sure?',
        confirmText: 'Delete',
        type: 'is-primary',
        onConfirm: () => {
          this.onDeletionConfirm(version);
        },
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
    showError(error) {
      // TODO: Treat errors
      this.$buefy.dialog.alert({
        title: 'Error',
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

.icon {
  pointer-events: initial !important;
}

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

  &__table {
    &__version-number {
      color: $primary;
      font-weight: bold;
    }

    &__buttons-wrapper {
      display: flex;
      justify-content: space-between;
      color: $color-grey-dark;
    }
  }
}
</style>
