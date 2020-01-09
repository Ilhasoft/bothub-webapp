<template>
	<div class="repository-version-table">

		<b-table :data="items"
				:loading="this.loading" 
				:paginated="paginated"
				:pagination-simple="simple"
            	:per-page="perPage"
            	:backend-pagination="backendPagination"
            	:total="this.total"
            	v-on:page-change="onPageChange()"
            	:current-page.sync="currentPage">
			
			<template slot-scope="props">
                <b-table-column v-for="column in columns" 
                				:key="column.field" 
                				:field="column.field" 
                				:label="column.label"
                				width="40"
                				class="version-table__row"        		>

                				<a v-if="column.field == 'name'"> {{ props.row[column.field] }} </a>
		  						<span v-else>{{ props.row[column.field] }}</span>
                </b-table-column>

				<b-table-column class="version-table__row"
								label="" 
								width="40">

                	<div class="version-table__button-wrapper">
		  				<b-button 
		  						:class="[props.row['is_default'] ? 'version-table__main-button' : 'version-table__main-button__not-main', 
		  										'has-text-weight-bold', 
		  										'is-size-7', 
		  										'has-text-white']" 
		  						rounded 
		  						:type="props.row['is_default'] ? 'is-primary' : 'is-light' " 
		  						v-on:click="makeMain(props.row.id)"> 
		  					MAIN 
		  				</b-button>
		  				<b-button 
		  					icon-right="border-color" 
		  					class="version-table__small-button" 
		  					v-on:click="editVersion(props.row.id)">
		  				</b-button> 
		  				<b-button 
		  					icon-right="delete" 
		  					class="version-table__small-button" 
		  					v-on:click="deleteVersion(props.row.id)"> 
		  				</b-button>
		  			</div>	
                </b-table-column>
            </template>
		</b-table>
	</div>
</template>

<script>

	import { mapActions } from 'vuex';
		
	export default {

		name: 'RepositoryVersionTable',
		props: ['list'],
		computed: {

			total() {
				if (this.list == null) return 0;
				return this.list.total
			},
			loading() {
				if (this.list == null) return true;
				return this.list.loading
			},
			items() {
				if (this.list == null) return [];
				return this.list.items.map((item) => { return item.data; });
			}
		},
		watch: {
			async list() {
      			await this.next();
      			console.log(this.list)
      		}
		}, methods: {

			async onPageChange() {
				if (previousPage <= currentPage) {
					previousPage = currentPage;
					await next();
				}
			},

			async next() {
		      try {
		        await this.list.next();
		      } catch (e) {
		        this.listStatusErrorCode = e.request
		          ? e.request.status
		          : '';
		      }
    		},
    		rowClass(row, index) {
    			return 'version-table__row';
    		}
		},
		data() {
			return {
				previousPage: 1,
				currentPage: 1,
				backendPagination: true,
				simple: true,
				paginated: true,
				perPage: 5,
				columns: [
						{label: "Version", field: "name"},
						{label: "Created by", field: "createdBy"},
						{label: "Last modified", field: "lastModified"},
						{label: "Created at", field: "created_at"},
				],
			}
		}
	}

</script>

<style lang="scss">
	@import '~bh/src/assets/scss/colors.scss';
	@import '~@/assets/scss/utilities.scss';
	@import '~bh/src/assets/scss/variables.scss';

	$table-border: #CFD5D9;
	$table-width: 1px;
	$button-height: 1.5rem;
	$table-spacing: 1.5rem;
	$header-spaceing: 0.6rem;
	$table-margin: 1rem;

	.b-table .table {
		text-align: left;
		background-color: white;
		border: $table-width solid $table-border;
		border-collapse: collapse;

		th {
			background-color: white;
		}
	}

	.version-table {

		&__row {
			padding: $table-spacing $table-margin  $table-spacing $table-margin !important;
		}

			&__main-button {
				height: $button-height;

				&__not-main {
					height: $button-height;
					background-color: $color-grey-dark;
				}
			}

			&__small-button {
				border: none;
				background-color: white;
				height: $button-height;
			}
		}
</style>