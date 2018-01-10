<template>
	<div class="bot-card">
		<div class="up-down-card-column"></div>
		<div class="image-card-column"></div>
		<div class="body-card-column">
			<h3>{{card.bot_name}}</h3>
			<span>{{card.updated_at}}</span>
			<list-flags :flags="card.languages"></list-flags>
			<hr>
			<p>
				{{card.description}}
			</p>
		</div>
	</div>
</template>

<script>
import ListFlags from "./ListFlags.vue"
export default {
	name: 'card',
	props: {
		card: {
			type: Object,
			required: true
		}
	},
	mounted() {
	},
	methods:{
	},
	components:{
		ListFlags
	}
}
</script>
<style>
	.bot-card {
		margin: 0 auto;
		width: 80%;
		background: red;
		border-radius: 25px;
		padding: 25px;
		height: 160px;
	}
	.up-down-card-column {
		width: 10%;
		height: 100%;
		background: black;
		float: left;
	}
	.image-card-column {
		width: 20%;
		height: 100%;
		background: yellow;
		float: left;
	}
	.body-card-column {
		width: 70%;
		height: 100%;
		background: green;
		float: left;
	}
</style>