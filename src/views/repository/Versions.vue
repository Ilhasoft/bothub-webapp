<template>
  <layout>
    <div class="version">
      <div class="version__header">
        <div class="version__header__title__wrapper">
          <h2>Versions</h2>
          <b-button
            class="version__header__button has-text-weight-bold"
            type="is-primary"
            @click="addNewVersion()">
            Add new
          </b-button>
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
              numeric>
              <span class="version__table__version-number">
                {{ props.row.version }}
              </span>
            </b-table-column>

            <b-table-column
              field="user.first_name"
              label="created by"
              sortable>
              {{ props.row.created_by }}
            </b-table-column>

            <b-table-column
              field="user.last_name"
              label="Date Created"
              sortable>
              {{ props.row.date_created }}
            </b-table-column>

            <b-table-column
              field="date"
              label="Latest Modification"
              sortable
              centered>
              <span class="tag is-success">
                {{ props.row.latest_modification }}
              </span>
            </b-table-column>

            <b-table-column
              width="180"
              label="">
              <div class="version__table__buttons-wrapper">
                <b-button
                  :type="props.row.main ? 'is-primary': 'is-light'"
                  class="is-small"
                  rounded>Main</b-button>
                <b-icon icon="pen"/>
                <b-icon icon="delete"/>
              </div>
            </b-table-column>
          </template>
        </b-table>
      </section>
    </div>
  </layout>
</template>

<script>
import { mapActions } from 'vuex';
import RepositoryBase from './Base';
import Layout from '@/components/shared/Layout';

const data = [
  {
    id: 1, version: 'v01549', created_by: 'johncordeiro', date_created: '4 sep 2019', latest_modification: '2 months ago', main: true,
  },
  {
    id: 2, version: 'v01323', created_by: 'johncordeiro', date_created: '5 sep 2019', latest_modification: '5 months ago',
  },
  {
    id: 3, version: 'v05555', created_by: 'johncordeiro', date_created: '6 sep 2019', latest_modification: '4 months ago',
  },
  {
    id: 4, version: 'v03333', created_by: 'johncordeiro', date_created: '7 sep 2019', latest_modification: '6 months ago',
  },
  {
    id: 5, version: 'v06666', created_by: 'johncordeiro', date_created: '8 sep 2019', latest_modification: '2 months ago',
  },
  {
    id: 6, version: 'v03323', created_by: 'johncordeiro', date_created: '9 sep 2019', latest_modification: '3 months ago',
  },
  {
    id: 7, version: 'v05666', created_by: 'johncordeiro', date_created: '10 sep 2019', latest_modification: '5 months ago',
  },
  {
    id: 8, version: 'v33333', created_by: 'johncordeiro', date_created: '22 sep 2019', latest_modification: '6 months ago',
  },
];

export default {
  name: 'RepositoryVersions',
  components: {
    Layout,
  },
  extends: RepositoryBase,
  data() {
    return {
      data,
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 5,
      versions: [],
    };
  },
  mounted() {
    this.updateRepository().then(() => {
      this.updateVersions();
    });
  },
  methods: {
    ...mapActions([
      'getVersions',
    ]),

    async updateVersions() {
      this.versions = await this.getVersions(this.repository.uuid);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~@/assets/scss/utilities.scss';
@import '~bh/src/assets/scss/variables.scss';

.version {
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
