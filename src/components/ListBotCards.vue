<template>
	<ul>
		<li :key="i" v-for="(card, i) in lista_cards">
			<bot-card :card="card"></bot-card>
		</li>
	</ul>
</template>

<script>
	import BotCard from './BotCard.vue'
	export default {
		data() {
			return {
				lista_cards: []
			}
		},
		components:{
			BotCard
		},
		mounted() {
			this.lista_cards = [
				{
					bot_name: 'Bot Example',
					bot_slug: 'bot_slug',
					languages: ['NL', 'PT', 'ES', 'DE'],
					description: 'This is the brief description about this bot, this bot do bla bla bla anything',
					tags: ['food', 'blabla', 'othertag', 'etc'],
					updated_at: new Date("10/10/2015"),
					updated_by: 'Username',
					informations: {
						reputation: 302,
						stars: 200,
						issues: 3321,
						forks: 223,
						starred: false
					}
				},
				{
					bot_name: 'Bot Example 2',
					bot_slug: 'bot_slug_2',
					languages: ['EN', 'PT', 'ES', 'DE', 'IT', 'NL', 'FR'],
					description: 'This is the brief description about this bot, this bot do bla bla bla anything',
					tags: ['food', 'blabla', 'othertag', 'etc'],
					updated_at: new Date("12/12/2017"),
					updated_by: 'fulano de tal',
					informations: {
						reputation: 102,
						stars: 200,
						issues: 1321,
						forks: 23,
						starred: true
					}
				}  
			]
		},
		methods:{
			alert(a){
				alert(a)
			}
		}
	}
</script>
<style>
	li {
		list-style: none;
		margin: 20px;
	}
</style>
