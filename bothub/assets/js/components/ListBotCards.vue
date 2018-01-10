<template>
	<ul>
		<li :key="i" v-for="(card, i) in lista_cards">
			<a href="#" v-on:click="alert(card.bot_name)"><bot-card :card="card"></bot-card></a>
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
			languages: ['EN', 'PT', 'ES', 'DE'],
			description: 'This is the brief description about this bot, this bot do bla bla bla anything',
			tags: ['food', 'blabla', 'othertag', 'etc'],
			updated_at: '21231231',
			updated_by: 'Username',
			informations_count: {
				reputation: 302,
				issues: 3321,
				forks: 223
			}
        },
        {
			bot_name: 'Bot Example 2',
			bot_slug: 'bot_slug_2',
			languages: ['EN', 'PT', 'ES', 'DE'],
			description: 'This is the brief description about this bot, this bot do bla bla bla anything',
			tags: ['food', 'blabla', 'othertag', 'etc'],
			updated_at: '22211122',
			informations_count: {
				reputation: 102,
				issues: 1321,
				forks: 23
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
