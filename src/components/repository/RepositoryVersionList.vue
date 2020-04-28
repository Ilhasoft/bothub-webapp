<template>
  <div class="version-list">
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
    <loading v-if="loadingList" />
    <section v-else>
      <b-table
        v-if="versionsList"
        :data="versionsList.items"
        :paginated="true"
        :backend-pagination="true"
        :total="versionsList.total"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="false"
        backend-sorting
        @sort="'is_default'"
      >
        <template slot-scope="props">
          <b-table-column
            :width="isEdit.edit ? 200 : 60"
            field="name"
            label="version"
            sortable
            centered
            numeric>
            <b-field v-if="isEdit.edit === true && isEdit.id === props.row.id">
              <div class="versions__edit-input">
                <b-input
                  :expanded="true"
                  v-model="isEdit.name"
                  :value="isEdit.name"
                  :maxlength="maxEditLength"
                  :has-counter="false"
                  icon-right-clickable="true"
                  icon-right="close"
                  @icon-right-click="isEdit.edit = false"
                  @keyup.enter.native="handleEditVersion(isEdit.name, props.row.id)"/>
            </div></b-field>
            <span
              v-else
              class="versions__table__version-number">
              {{ props.row.name }}
            </span>
          </b-table-column>
          <b-table-column
            :label="$t('webapp.versions.date_created')"
            centered
            field="created_at"
            sortable >
            {{ props.row.created_at | moment('from') }}
          </b-table-column>
          <b-table-column
            :label="$t('webapp.versions.last_modified')"
            centered
            field="last_update"
            sortable>
            {{ props.row.last_update | moment('from') }}
          </b-table-column>
          <b-table-column
            :label="$t('webapp.versions.created_by')"
            centered
            field="created_by"
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
              <b-button
                :type="props.row.is_default ? 'is-primary': 'is-light'"
                :disabled="!canEdit"
                class="is-small"
                rounded
                @click="handleDefaultVersion(props.row.id, props.row.name)">
                {{ $t('webapp.versions.main') }}
              </b-button>
              <b-icon
                v-if="canEdit"
                icon="pencil"
                size="is-small"
                class="versions__table__buttons-wrapper__icon"
                @click.native="onEditVersion({id: props.row.id, name: props.row.name})"/>
              <b-icon
                v-if="canEdit"
                icon="delete"
                size="is-small"
                class="versions__table__buttons-wrapper__icon"
                @click.native="onDeleteVersion(props.row.id, props.row.is_default)"/>
              <b-icon
                v-if="canEdit"
                icon="content-copy"
                size="is-small"
                class="versions__table__buttons-wrapper__icon"
                @click.native="copyVersion(props.row)"/>
            </div>
          </b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import RepositoryHandleVersionModal from '@/components/repository/RepositoryHandleVersionModal';
import Loading from '@/components/shared/Loading';

export default {
  name: 'RepositoryVersionList',
  components: {
    RepositoryHandleVersionModal,
    Loading,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    perPage: {
      type: Number,
      default: 5,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maxEditLength: 40,
      versionsList: null,
      asc: false,
      isEdit: {},
      currentPage: 1,
      isNewVersionModalActive: false,
      selectedVersion: null,
      editName: null,
      loadingEdit: false,
      loadingList: false,
      currentEditVersion: null,
    };
  },
  computed: {
    repositoryUUID() {
      if (!this.repository || this.repository.uuid === 'null') { return null; }
      return this.repository.uuid;
    },
    query() {
      return {
        repository: this.repositoryUUID,
        ordering: `${this.asc ? '+' : '-'}${this.orderField}`,
      };
    },
  },
  watch: {
    query() {
      this.updateParams();
    },
    currentPage() {
      this.updateVersions();
    },
    repositoryUUID() {
      this.updateParams();
    },
  },
  mounted() {
    this.updateParams();
  },
  methods: {
    ...mapActions([
      'getVersions',
      'setDefaultVersion',
      'deleteVersion',
      'editVersion',
      'setUpdateVersionsState',
    ]),
    sort(orderField, asc) {
      this.orderField = orderField;
      this.asc = asc === 'asc';
      this.updateVersions();
    },
    async updateParams() {
      if (!this.repositoryUUID) { return; }
      const response = await this.getVersions({
        limit: this.perPage,
        query: this.query,
      });
      this.versionsList = response;
      this.updateVersions();
    },
    async updateVersions() {
      this.loadingList = true;
      try {
        await this.versionsList.updateItems(this.currentPage);
        this.loadingList = false;
      } catch (e) {
        this.loadingList = false;
        this.showError(e);
      }
    },
    handleDefaultVersion(id, name) {
      this.$buefy.dialog.confirm({
        title: this.$t('webapp.versions.change_default_version'),
        message: this.$t('webapp.versions.message_change_default_version'),
        confirmText: this.$t('webapp.versions.confirm_change_default_version'),
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
        this.setUpdateVersionsState(true);
        this.$buefy.toast.open({
          message: this.$t('webapp.versions.version_has_edited'),
          type: 'is-success',
        });
        this.isEdit = false;
        this.updateVersions();
      }).catch(() => {
        this.$buefy.toast.open({
          message: this.$t('webapp.versions.something_wrong'),
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
        message: this.$t('webapp.versions.version_was_created'),
        type: 'is-success',
      });
      this.setUpdateVersionsState(true);
      this.updateVersions();
    },
    onDeleteVersion(id, isDefault) {
      if (isDefault) {
        this.$buefy.toast.open({
          duration: 5000,
          message: this.$t('webapp.versions.you_cannot_delete_main_branch'),
          position: 'is-top',
          type: 'is-danger',
        });
      } else {
        this.$buefy.dialog.confirm({
          title: this.$t('webapp.versions.deleting_version'),
          message: this.$t('webapp.versions.message_deleting_version'),
          confirmText: this.$t('webapp.versions.confirm_deleting_version'),
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.onDeleteVersionConfirm(id),
        });
      }
    },
    async onDeleteVersionConfirm(id) {
      try {
        this.loadingList = true;
        await this.deleteVersion(id);
        this.setUpdateVersionsState(true);
        this.updateVersions();
      } catch (e) {
        this.showError(e);
      } finally {
        this.loadingList = false;
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
      align-items: center;
      color: $color-grey-dark;

      &__icon{
        margin-left: .6rem;
      }
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
