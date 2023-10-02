<script lang="ts">
	import Icon from './Icon.svelte';
	export let icon: string;
	export let label: string;
	export let onclick: () => void;
	export let className: string = '';
</script>

<button class={className} class:buttonWithIcon={!!icon} on:click={onclick}>
	{#if icon}
		<Icon {icon} />
	{/if}
	<span>
		{label}
	</span>
</button>

<style>
	.buttonWithIcon {
		display: flex;
		gap: 0.25rem;
		justify-content: center;
	}
</style>
