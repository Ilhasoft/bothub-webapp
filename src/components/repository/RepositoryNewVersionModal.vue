<template>
	<div class="repository-new-version-modal">
        <div class="repository-new-version-modal__container">
		<form @submit.prevent="onSubmit">
          <div class="field">
			  <label class="label">Title</label>
			  <div class="control">
			    <input class="input"
			    v-model="name"
			    type="text">
			  </div>
		</div>
          <div class="field">
            <div class="control has-text-centered">
            </div>
            <div class="control">
			  <div class="select" >
			    <select v-model="selectedVersion">
			    <option 
			    	selected> 
			    	Source Version
			    </option>
			    <option 
			    	v-for="version in versions"
			    	v-bind:value="version.id"> {{ version.name }} </option>
			    </select>
			  </div>
                <b-button
				  	type="is-light"
				  	@click="onClose()"
	                >
            	Cancel
            	</b-button>
                <b-button
				  	type="is-primary"
				  	@click="onSubmit()"
	                native-type="submit"
	                >
	            	Add new
	        	</b-button>
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
			versions: {
				type: Array,
			},
			// isActive: {
			// 	type: Boolean,
			// 	default: false,
			// },
		},
		data() {
			return {
				submitting: false,
				name: null,
				selectedVersion: null,
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
    			console.log(this.repository.uuid, this.selectedVersion, this.name)
    			await this.addNewVersion( 
    				{
    					repositoryUUID: this.repository.uuid, 
    					versionUUID: this.selectedVersion, 
    					name: this.name 
    				});
    			this.$emit('addedVersion');
    		}
   		}
	};
</script>

<style lang="scss">
	.repository-new-version-modal {
		&__container {
			margin: 0 auto;
			width: 600px;
			padding: 28px;
			border-radius: 8px;
			background-color: red;
		}
	}
	
</style>