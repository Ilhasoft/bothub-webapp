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
			<paginated-table
				:list="versions"
				:columns="columns"
				:perPage="perPage"
			/>
		</div>
	</layout>
</template>

<script>
	import request from '@/api/request';
	import store from '@/store';
	import RepositoryBase from './Base';
	import Layout from '@/components/shared/Layout';
	import PaginatedTable from '@/components/shared/PaginatedTable';
	import RepositoryVersionOptions from '@/components/repository/RepositoryVersionOptions';

	import { mapActions } from 'vuex';

	export default {
		name: 'RepositoryVersions',
		extends: RepositoryBase,
		components: {
    		Layout,
    		PaginatedTable,
    		RepositoryVersionOptions
    	},

    	data() {
    		return {
    			perPage: 5,
    			versions: null,
    			columns: [
					{label: "Version", field: "name", component: null},
					{label: "Created by", field: "created_by", component: null},
					{label: "Last modification", field: "last_modified", component: null},
					{label: "Created at", field: "created_at", component: null},
					{label: "", field: "is_default", component: RepositoryVersionOptions}
				],
    		}
    	}, 

    	mounted() {
    		this.updateRepository().then(() => {
    			this.updateVersions();
    		});
    	},

    	methods: {

    		addNewVersion() {
    			//TODO:
    		},

    		 ...mapActions([
      			'getVersions',
   			]),
    		 
    		async updateVersions() {
    			this.versions = await this.getVersions(this.repository.uuid)
    		}
    	}

	}
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
	}
</style>