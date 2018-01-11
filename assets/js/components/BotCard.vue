<template>
	<div class="bot-card">
		<div class="up-down-card-column">
			<up-down-vote :reputation="card.informations_count.reputation"></up-down-vote>
		</div>
		<div class="image-card-column">
			<img src="/static/images/bothub_logo.svg" alt="">
		</div>
		<div class="body-card-column">
			<header>
				<div class="bot-title">{{card.bot_name}}</div>
				<div class="bot-informations">
					<stars :status="card.informations.starred" :count="card.informations.stars"></stars>
				</div>
			</header>
			<div>
				<span class="updated-at">Updated {{timeDifference(card.updated_at)}} by {{card.updated_by}}</span>
				<list-flags :flags="card.languages"></list-flags>
			</div>
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
	import Stars from "./bot_informations/Stars.vue"
	export default {
		name: 'card',
		components: {
			ListFlags,
			UpDownVote,
			ListTags,
			Stars
		},
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
		}
	}
</script>
<style lang="less">
	@import url('https://fonts.googleapis.com/css?family=Encode+Sans');
	.bot-card {
		font-family: 'Encode Sans', sans-serif;
		margin: 0 auto;
		width: 1080;
		background: #f8f8f8;
		border-radius: 25px;
		padding: 25px;
		height: 200px;
		.up-down-card-column {
			width: 10%;
			height: 100%;
			float: left;
		}
		.image-card-column {
			width: 20%;
			height: 100%;
			line-height: 100px;
			float: left;
			margin: 0;
			img {
				margin: 25px auto;
				display: block;
				box-shadow: 1px 1px 5px black;
				padding: 4px;
				width: 140px;
				height: 140px;
				border-radius: 150px;
			}
		}
		.body-card-column {
			width: 70%;
			height: 100%;
			float: left;
			hr {
				opacity: 0.19;
			}
			header{
				width: 100%;
				height: 35px;
				.bot-title {
					width: 238px;
					height: 23px;
					color: #000000;
					line-height: normal;
					letter-spacing: normal;
					font-size: 18px;
					font-weight: 500;
					font-style: normal;
					font-stretch: normal;
					float: left;
				}
				.bot-informations {
					height: 25px;
					width: 400px;
					float: right;
				}
			}
			
			.updated-at{
				width: 211px;
				height: 15px;
				opacity: 0.3;
				font-size: 12px;
				font-weight: normal;
				font-style: normal;
				font-stretch: normal;
				line-height: normal;
				letter-spacing: normal;
				color: #000000;
			}
		}
		&:hover {
			box-shadow: 0 5px 15px rgba(0,0,0,0.3);
			transition: 0.9s;
		}
	}
</style>