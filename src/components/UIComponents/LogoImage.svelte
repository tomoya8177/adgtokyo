<script lang="ts">
	import { goto } from '$app/navigation';

	export let size = '2rem';
</script>

<div
	aria-hidden="true"
	style:width={size}
	style:height={size}
	class="logoImage"
	on:click={() => {
		goto('/');
	}}
/>

<style>
	.logoImage {
		background-image: url(/images/logo_light.png);
		background-size: cover;
		cursor: pointer;
	}
	@media only screen and (prefers-color-scheme: dark) {
		.logoImage {
			background-image: url(/images/logo_dark.png);
		}
	}
</style>
