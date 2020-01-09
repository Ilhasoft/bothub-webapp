<template>
	<div class="repository-version-options">
		<div class="repository-version-options__wrapper">
		  				<b-button 
		  					:class="[		this.class, 
		  									'has-text-weight-bold', 
		  									'is-size-7', 
		  									'has-text-white']" 
		  					rounded 
		  					:type="this.type"
		  					v-on:click="makeMain()" 
		  				> 
		  				MAIN 
		  			</b-button>
		  			<b-button 
		  				icon-right="border-color" 
		  				class="repository-version-options__small-button"
		  				v-on:click="editVersion()" 
		  				>
		  			</b-button> 
		  			<b-button 
		  				icon-right="delete" 
		  				class="repository-version-options__small-button" 
		  				v-on:click="deleteVersion()"
		  				> 
		  			</b-button>
		  	</div>
	</div>	
</template>

<script>
	export default {
		name: 'RepositoryVersionOptions',
		props: {
			data: {
				required: true,
				type: Object
			}
		},
		computed: {
			class() {
				let classes = 'respository-version-options__main-button'
				if (!this.data['is_default']) classes.push('respository-version-options__main-button__enabled')
				return classes
			},
			type() {
				return this.data['is_default'] ? 'is-primary' : 'is-light'
			}
		},
		methods: {
			makeMain() {
				//TODO:
			},

			deleteVersion() {
				//TODO:
			},

			editVersion() {
				//TODO:
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	@import '~bh/src/assets/scss/colors.scss';
	
	$button-height: 1.5rem;

	.repository-version-options {
		&__wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
		}
			
		&__main-button {
			height: $button-height;

			&__enabled {
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