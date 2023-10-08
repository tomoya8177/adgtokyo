<script lang="ts">
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
	let focus = '001';
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
		}, 5000);
	});
</script>

<div>
	{#each numbers as num}
		{#if num == focus}
			<img src={`/images/${num}.jpg`} alt={num} transition:fade class="cover" />
		{/if}
	{/each}
</div>

<style>
	div {
		position: relative;
		height: 20rem;
		overflow: hidden;
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
