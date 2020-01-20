<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

      <b-modal class="repository-new-version-modal"
        :active.sync="isNewVersionModalActive"
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
      <repository-new-version-modal
        :repository="repository"
        :version="selectedVersion"
        v-on:close="isNewVersionModalActive = false"
        v-on:error="showError"
        v-on:addedVersion="onAddedVersion()"/>
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
              <span 
                @click="handleVersion(props.row.id, props.row.name)"
                class="versions__table__version-number">
                {{ props.row.name }}
              </span>
            </b-table-column>
            <b-table-column
              centered
              field="user.last_name"
              label="Date Created"
              sortable>
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
                  rounded>Main</b-button>
                <b-icon icon="pencil"/>
                <b-icon icon="delete"/>
                <b-icon 
                  icon="content-copy"
                  @click.native="copyVersion(props.row)">
                </b-icon>
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
import RepositoryNewVersionModal from '@/components/repository/RepositoryNewVersionModal'


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
      versions: [],
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
      'setRepositoryVersion'
    ]),

    async updateVersions() {
      const response = await this.getVersions(this.repository.uuid);
      this.data = response.data.results;
    },
    handleVersion(id, name) {
      this.setRepositoryVersion({
        id,
        name
      });
    },
    copyVersion(version) {
      this.selectedVersion = version;
      this.isNewVersionModalActive = true;
    },
    onAddedVersion(version) {
      this.isNewVersionModalActive = false;
      this.updateVersions();
    },
    showError(error) {
      //TODO: Treat errors
      this.$buefy.dialog.alert({
                    title: 'Error',
                    message: error.response.data,
                    type: 'is-danger',
                    confirmText: 'OK'
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
