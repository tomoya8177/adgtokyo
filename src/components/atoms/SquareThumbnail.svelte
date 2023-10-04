<script lang="ts">
	export let size = '4rem';
	export let url: string;
</script>

<span style="width: {size}; height: {size};">
	<img
		src={url}
		style="object-fit: cover; width: 100%; height: 100%; position: relative; top: -50%; left: -50%; transform: translate(50%, 50%);"
	/>
</span>

<style>
	span {
		overflow: hidden;
		display: inline-block;
		border-radius: var(--pico-border-radius);
	}
</style>
