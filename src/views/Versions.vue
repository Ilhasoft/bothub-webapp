<template>
	<layout>
		<div class="version">
			<div class="version__header">
				<div class="version__header__title__wrapper">
					<div class="version__header__title"> Versions </div> 
					<b-button 
							class="version__header__button has-text-weight-bold" 
							type="is-primary"
							v-on:click="addNewVersion()"> 
						Add new 
					</b-button>
				</div>
				<p> Add, edit and choose versions of your bot intelligence. </p>
			</div>
			<table class="version__table">
				<tr class="version__table__row">
		    		<th class="version__table__row__header" v-for="column in columns" :key="column.field"> {{ column.label }} </th>
		  		</tr>
		  		<tr class="version__table__row" v-for="version in versions" :key="version.name"> 
		  			<td class="version__table__row__element" v-for="column in columns" :key="column.field">
		  				<a v-if="column.field == 'name'"> {{ version[column.field] }} </a>
		  				<span v-else>{{ version[column.field] }}</span>
		  			</td>
		  			<td class="version__table__row__element">
		  				<div class="version__table__button-wrapper">
		  				<b-button 
		  						v-bind:class="[version.isMain ? 'version__table__main-button' : 'version__table__main-button__not-main', 
		  										'has-text-weight-bold', 
		  										'is-size-7', 
		  										'has-text-white']" 
		  						rounded 
		  						:type="version.isMain ? 'is-primary' : 'color-grey-dark' " 
		  						v-on:click="makeMain(version.id)"> 
		  					MAIN 
		  				</b-button>
		  					<button class="version__table__small-button" v-on:click="editVersion(version.id)"> 
		  						<img src="../assets/imgs/flags/br.svg" /> <!-- Placeholder images !--> 
		  					</button>
		  					<button class="version__table__small-button" v-on:click="deleteVersion(version.id)"> 
		  						<img src="../assets/imgs/flags/us.svg" />
		  					</button>
		  				</div>
		  			</td>
		  		</tr>
			</table>
		</div>
	</layout>
</template>

<script>
	import Layout from '@/components/shared/Layout';
	export default {
		name: 'Versions',
		components: {
    		Layout,
    	},
		computed: {
			// TODO: Replace Mock data with fetching
			columns() {
				return [
					{label: "Version", field: "name"},
					{label: "Created by", field: "createdBy"},
					{label: "Last modified", field: "lastModified"},
					{label: "Created at", field: "createdAt"},
				]
			},
			versions() {
				let data = [{
					name: `v${Math.floor(Math.random() * 800) + 900}`,
					createdBy: "Possum Boy",
					lastModified: "Dec 06 2020",
					createdAt: "Dec 05 2020",
					isMain: true
				}]

				for(var i=0; i<25; i++) {
					data.push({
						name: `v${Math.floor(Math.random() * 800) + 900}`,
						createdBy: "Possum Boy",
						lastModified: "Dec 06 2020",
						createdAt: "Dec 05 2020",
						isMain: false
					})
				}

				return data
			}
		}, methods: {
			makeMain(id) {
				//TODO:
			},

			editVersion(id) {
				//TODO:
			},

			deleteVersion(id) {
				//TODO:
			},

			addNewVersion(id) {
				//TODO:
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

	.version {
		margin: auto;
		max-width: $max-repository-card-width;

		&__header {
			margin: 3.875rem 0 2.75rem 0;
			&__title {
    			font-size: 1.75rem;
    			font-weight: 700;
    			margin: 0 0.5rem 1.5rem 0 ;

	    		&__wrapper {
	    			display: flex;
	    		}
	    	}

	    	&__button {
	    		text-weight: bold;
	    	}
  		}

		&__table {
			padding: 1em;
			text-align: left;
			background-color: white;
			border: $table-width solid $table-border;
			border-collapse: collapse;

			&__row {

				background-color: white;
				text-align: left;
				border: $table-width solid $table-border;

				&__header {
					background-color: white;
					padding: 0.6rem 1em  0.6rem 5rem;
				}

				&__element {
					padding: $table-spacing 1em  $table-spacing 5rem;
				}
			}

			&__button-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
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
	}
</style>