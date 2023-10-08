<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	export let icon: string = '';
	export let label: string = '';
	export let onclick: () => void;
	export let className: string = '';
	export let white: boolean = false;
	export let busy = false;
</script>

<button aria-busy={busy} class={className} class:white on:click={onclick}>
	{#if icon}
		<Icon {icon} />
	{/if}
	<span style:margin-right={icon ? '0.5rem' : ''}>
		{label}
	</span>
</button>

<style>
	.white {
		background-color: rgba(255, 255, 255, 0.5);
		box-shadow: var(--pico-card-box-shadow);
	}
	button {
		display: flex;
	}
</style>
