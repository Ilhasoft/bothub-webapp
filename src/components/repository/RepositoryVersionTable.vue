<template>
	<div class="repository-version-table">
	<table class="version-table__table">
				<tr class="version-table__row">
		    		<th class="version-table__row__header" v-for="column in columns" :key="column.field"> {{ column.label }} </th>
		  		</tr>
		  		<tr class="version-table__row" v-for="version in items" :key="version.name"> 
		  			<td class="version-table__row__element" v-for="column in columns" :key="column.field">
		  				<a v-if="column.field == 'name'"> {{ version[column.field] }} </a>
		  				<span v-else>{{ version[column.field] }}</span>
		  			</td>
		  			<td class="version-table__row__element">
		  				<div class="version-table__button-wrapper">
		  				<b-button 
		  						:class="[version['is_default'] ? 'version-table__main-button' : 'version-table__main-button__not-main', 
		  										'has-text-weight-bold', 
		  										'is-size-7', 
		  										'has-text-white']" 
		  						rounded 
		  						:type="version['is_default'] ? 'is-primary' : 'is-light' " 
		  						v-on:click="makeMain(version.id)"> 
		  					MAIN 
		  				</b-button>
		  				<b-button 
		  					icon-right="border-color" 
		  					class="version-table__small-button" 
		  					v-on:click="editVersion(version.id)">
		  				</b-button> 
		  				<b-button 
		  					icon-right="delete" 
		  					class="version-table__small-button" 
		  					v-on:click="deleteVersion(version.id)"> 
		  				</b-button>
		  			</div>
		  		</td>
		  	</tr>
		</table>
	</div>
</template>

<script>

	import { mapActions } from 'vuex';
		
	export default {

		name: 'RepositoryVersionTable',
		props: ['list'],
		computed: {
			items() {
				if (this.list == null) return [];
				return this.list.items.map((item) => { return item.data; });
			}
		},
		watch: {
			async list() {
      			await this.next();
      			console.log(this.items)
      		}
		}, methods: {
			async next() {
		      try {
		        await this.list.next();
		      } catch (e) {
		        this.listStatusErrorCode = e.request
		          ? e.request.status
		          : '';
		      }
    		}
		},
		data() {
			return {
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

<style lang="scss" scoped>
	@import '~bh/src/assets/scss/colors.scss';
	@import '~@/assets/scss/utilities.scss';
	@import '~bh/src/assets/scss/variables.scss';

	$table-border: #CFD5D9;
	$table-width: 1px;
	$button-height: 1.5rem;
	$table-spacing: 1.5rem;
	$header-spaceing: 0.6rem;
	$table-margin: 1rem;

	.version-table {
		
		&__table {
			padding: 1em;
			text-align: left;
			background-color: white;
			border: $table-width solid $table-border;
			border-collapse: collapse;
		}

		&__row {

				background-color: white;
				text-align: left;
				border: $table-width solid $table-border;

				&__header {
					background-color: white;
					padding: $header-spaceing $table-margin $header-spaceing $table-margin;
				}

				&__element {
					padding: $table-spacing $table-margin  $table-spacing $table-margin;
				}
			}

			&__button-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: right;
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