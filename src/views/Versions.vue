<template>
	<layout>
		<table>
			<tr>
	    		<th v-for="column in columns" :key="column.field"> {{ column.label }} </th>
	  		</tr>
	  		<tr v-for="version in versions" :key="version.name"> 
	  			<td v-for="column in columns" :key="column.field">
	  				<a v-if="column.field == 'name'"> {{ version[column.field] }} </a>
	  				<span v-else>{{ version[column.field] }}</span>
	  			</td>
	  			<td>
	  				<div class="object-container">
	  				<b-button rounded :type="version.isMain ? 'is-primary' : '' "> Main </b-button>
	  					<button class="version-small-button"> 
	  						<img src="../assets/imgs/flags/br.svg" /> 
	  					</button>
	  					<button class="version-small-button"> 
	  						<img src="../assets/imgs/flags/us.svg" />
	  					</button>
	  				</div>
	  			</td>
	  		</tr>
		</table>
	</layout>
</template>

<script>
	export default {
		name: 'Versions',
		computed: {
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

				for(var i=0; i<6; i++) {
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
		}
	}
</script>

<style scoped>
	
	a {
		font-style: bold;
	}

	.version-small-button{
		border: none;
		background-color: white;
		width: 40px;
		height: 40px;
	}

	.version-main-button {
		background-color: green;
	}

	.version-main-button-off {
		background-color: gray;
	}

	.version-main-button .version-main-button-off {
		border-radius: 1em;
	}

	th {
		font-style: bold;
	}

	table, tr {
		border: 3px solid #aaaa;
		border-collapse: collapse;
	}
	th, td, table {
		padding: 1em;
		text-align: left;
		background-color: white;    
	}
</style>