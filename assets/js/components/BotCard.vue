<template>
	<div class="bot-card">
		<div class="up-down-card-column">
			<up-down-vote :reputation="card.informations_count.reputation"></up-down-vote>
		</div>
		<div class="image-card-column">
			<img src="https://evangelicoblog.com/midia/2015/02/belo-ceu.jpg" alt="">
		</div>
		<div class="body-card-column">
			<h3>{{card.bot_name}}</h3>
			<span>Updated {{timeDifference(card.updated_at)}} by {{card.updated_by}}</span>
			<list-flags :flags="card.languages"></list-flags>
			<hr>
			<p>
				{{card.description}}
			</p>
			<list-tags :tags="card.tags"></list-tags>
		</div>
	</div>
</template>

<script>
import ListFlags from "./ListFlags.vue"
import UpDownVote from "./UpDownVote.vue"
import ListTags from "./ListTags.vue"
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
		timeDifference(previous) {

			var msPerMinute = 60 * 1000;
			var msPerHour = msPerMinute * 60;
			var msPerDay = msPerHour * 24;
			var msPerMonth = msPerDay * 30;
			var msPerYear = msPerDay * 365;

			var elapsed = Date.now() - previous;

			if (elapsed < msPerMinute) {
				return Math.round(elapsed/1000) + ' seconds ago';
			}

			else if (elapsed < msPerHour) {
				return Math.round(elapsed/msPerMinute) + ' minutes ago';
			}

			else if (elapsed < msPerDay ) {
				return Math.round(elapsed/msPerHour ) + ' hours ago';
			}

			else if (elapsed < msPerMonth) {
				return Math.round(elapsed/msPerDay) + ' days ago';
			}

			else if (elapsed < msPerYear) {
				return Math.round(elapsed/msPerMonth) + ' months ago';
			}

			else {
				return Math.round(elapsed/msPerYear ) + ' years ago';
			}
		}
	},
	components:{
		ListFlags,
		UpDownVote,
		ListTags
	}
}
</script>
<style lang="less">
	.bot-card {
		margin: 0 auto;
		width: 80%;
		/* background: red; */
		border-radius: 25px;
		padding: 25px;
		height: 190px;
		.up-down-card-column {
			width: 10%;
			height: 100%;
			/* background: black; */
			float: left;
		}
		.image-card-column {
			width: 20%;
			height: 100%;
			line-height: 100px;
			/* background: yellow; */
			float: left;
			margin: 0;
			img {
				margin: 5px auto;
				display: block;
				box-shadow: 1px 1px 5px black;
				/* background-color: #fff; */
				padding: 4px;
				width: 140px;
				height: 140px;
				border-radius: 150px;
			}
		}
		.body-card-column {
			width: 70%;
			height: 100%;
			/* background: green; */
			float: left;
		}
		&:hover {
			box-shadow: 0 5px 15px rgba(0,0,0,0.3);
			transition: 0.9s;
		}
	}
</style>