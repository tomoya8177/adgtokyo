<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	//array of 1 - 21
	let numbers = Array.from(Array(21).keys())
		.map((i) => i + 1)
		.map((num) => {
			//pad with 0 to make 3 digits
			let str = num.toString().padStart(3, '0');
			return str;
		});
	let focus = numbers[Math.floor(Math.random() * numbers.length)];
	onMount(() => {
		//rotate the numbers every 4 seconds
		setInterval(() => {
			let index = numbers.indexOf(focus);
			if (index == numbers.length - 1) {
				index = 0;
			} else {
				index += 1;
			}
			focus = numbers[index];
		}, 6000);
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
			<h1>ADG Tokyo</h1>
			<h5>
				{_(
					'A virtual sanctuary for filmmakers. No studios, no clients. Just inspiration, collaboration, and innovation.'
				)}
			</h5>
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
