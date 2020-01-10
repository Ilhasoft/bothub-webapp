<template>
	<div class="paginated-table">

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
                				class="paginated-table__row"        		>

                				<span v-if="column.component == null"> {{ column.transformText(props.row[column.field]) }} </span>
                				<component v-else
                							:is="column.component"
                							v-bind="addAttrs(props.row)">
                							</component>
                </b-table-column>
            </template>
		</b-table>
	</div>
</template>

<script>

	import { mapActions } from 'vuex';
		
	export default {

		name: 'RepositoryVersionTable',
		props: {
			list: {
				required: true
			}, 

			columns: {
				required: true,
				type: Array
			},
			perPage: {
				required: true,
			},
	  },
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
      		}
		}, methods: {

			async onPageChange() {
				if (previousPage <= currentPage) {
					previousPage = currentPage;
					await next();
				}
			},

			addAttrs(data) {
				return Object.assign({}, {"data": data});
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
    			return 'paginated-table__row';
    		}
		},
		data() {
			return {
				previousPage: 1,
				currentPage: 1,
				backendPagination: true,
				simple: true,
				paginated: true,
			}
		}
	}

</script>

<style lang="scss">

	$table-spacing: 1.5rem;
	$table-margin: 1rem;

	.paginated-table {

		&__row {
			padding: $table-spacing $table-margin  $table-spacing $table-margin !important;
		}

	}
</style>