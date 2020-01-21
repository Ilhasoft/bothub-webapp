<template>
	<div class="repository-new-version-modal">
        <div class="repository-new-version-modal__container">
        	<h1>Add new version</h1>
        	<p>Clone and turn into a new version</p>
		<form @submit.prevent="onSubmit">
          <div class="field">
			  <div class="control">
			    <input class="input"
			    placeholder="Title" 
			    v-model="name"
			    type="text">
			  </div>
		</div>
          <div class="field">
            <div class="control has-text-centered">
            </div>
            <div class="control">
            	<div class="field repository-new-version-modal__button-container">
	                <b-button
					  	type="is-light"
					  	@click="onClose()"
		                >
	            	Cancel
	            	</b-button>
	                <b-button
					  	type="is-primary"
					  	:loading="loading"
					  	:disabled="!canSubmit"
		                native-type="submit" >
		            	Add new
		        	</b-button>
		        </div>
			</div>
          </div>
        </form>
    </div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'RepositoryNewVersionModal',
		props: {
			repository: {
				type: Object,
			},
			version: {
				type: Object,
			}
		},
		computed: {
			canSubmit() {
				return !(!this.name || /^\s*$/.test(this.name))
			}
		},
		data() {
			return {
				loading: false,
				name: null,
			}
		},
		methods: {
    		...mapActions([
		      'addNewVersion',
    		]),
    		onClose() {
    			this.$emit('close');
    		},
    		async onSubmit() {
    			this.loading = true
    			await this.addNewVersion(
    				{
    					repositoryUUID: this.repository.uuid, 
    					versionUUID: this.version.id, 
    					name: this.name,
    				}).then( _ => {
    					this.loading = false;
    					this.$emit('addedVersion');
    				}).catch(error => {
    					this.$emit('error', error)
    					this.loading = false;
    				});
    		}
   		}
	};
</script>

<style lang="scss">
	@import '~@/assets/scss/utilities.scss';

	.repository-new-version-modal {

		&__container {
			margin: 0 auto;
			max-width: $max-repository-card-width;
			min-width: 200px;
			padding: 1.75rem;
			border-radius: 8px;
			background-color: white;
		}

		&__button-container {
			margin: 1.5rem;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
	
</style>