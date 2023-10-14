<script lang="ts">
	export let size = '2rem';
</script>

<div
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
