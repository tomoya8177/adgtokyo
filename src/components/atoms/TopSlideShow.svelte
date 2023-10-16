<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from '$lib/frontend/i18n';
	import { search } from '$lib/frontend/search';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	export let searchKeywords: { keyword: string; label: string; category: string }[] = [];
	//array of 1 - 21
	let featuredKeywordIndex = 0;
	let numbers = Array.from(Array(21).keys())
		.map((i) => i + 1)
		.map((num) => {
			//pad with 0 to make 3 digits
			let str = num.toString().padStart(3, '0');
			return str;
		});
	let focus = numbers[Math.floor(Math.random() * numbers.length)];
	onMount(() => {
		setInterval(() => {
			let index = numbers.indexOf(focus);
			if (index == numbers.length - 1) {
				index = 0;
			} else {
				index += 1;
			}
			focus = numbers[index];
		}, 8000);
		setInterval(() => {
			let index = featuredKeywordIndex;
			if (index == searchKeywords.length - 1) {
				index = 0;
			} else {
				index += 1;
			}
			featuredKeywordIndex = index;
		}, 5000);
	});
</script>

<div class="container">
	{#each numbers as num}
		{#if num == focus}
			<img
				src={`/images/${num}.jpg`}
				alt={num}
				transition:fade={{ duration: 3000 }}
				class="cover"
			/>
		{/if}
	{/each}
	<div class="foreground">
		<div>
			<!-- <h1>ADG Tokyo</h1> -->
			<h1>
				{_('A virtual sanctuary for filmmakers. Inspire, collaborate, and innovate.')}
			</h1>
			<div style="position:relative; display:flex; justify-content:center;">
				{#each searchKeywords as keyword, index}
					{#if index == featuredKeywordIndex}
						<button
							transition:fade
							style="position: absolute; left: auto; right: auto; "
							on:click={() => {
								goto(`/search/${keyword.category}/${keyword.keyword}`);
							}}
						>
							Search For:
							<strong>
								{keyword.label}
							</strong>
						</button>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		position: relative;
		height: 20rem;
		overflow: hidden;
		border-radius: var(--pico-border-radius);
	}
	.foreground {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		padding: 2rem;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		text-align: center;
	}
	.foreground * {
		color: white;
	}
	img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.cover {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
