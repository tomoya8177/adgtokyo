<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	export let icon: string = '';
	export let label: string = '';
	export let onclick: () => void;
	export let className: string = '';
	export let white: boolean = false;
	let iconButton = false;
	onMount(() => {
		if (icon && !label) {
			iconButton = true;
		}
	});
</script>

<button
	class={className}
	class:buttonWithIcon={!!icon}
	class:white
	class:outline={iconButton || className.includes('outline')}
	class:circle={iconButton}
	on:click={onclick}
>
	{#if icon}
		<div class:icon-container={iconButton} class:icon-container-with-label={!iconButton}>
			<Icon
				position={iconButton ? 'absolute' : 'relative'}
				size={iconButton ? '1.2rem' : '1.5rem'}
				{icon}
				color={iconButton ? 'var(--pico-color)' : 'var(--pico-text-color)'}
			/>
		</div>
	{/if}
	<span style:margin-right={icon ? '0.5rem' : ''}>
		{label}
	</span>
</button>

<style>
	.icon-container-with-label {
		display: inline;
		vertical-align: bottom;
		line-height: 70%;
	}
	.buttonWithIcon {
		gap: 0.25rem;
		justify-content: center;
		margin-bottom: calc(var(--pico-spacing) / 2);
	}
	.circle {
		display: flex;
		color: var(--pico-color);
		border: none;
		border-radius: 50%;
		height: 1.9rem;
		width: 1.9rem;
		background-color: rgba(0, 0, 0, 0);
		align-items: center;
		position: relative;
	}
	.white {
		background-color: rgba(255, 255, 255, 0.5);
		box-shadow: var(--pico-card-box-shadow);
	}
	.icon-container {
		position: absolute;
		display: flex;
		justify-content: center;
		vertical-align: -webkit-baseline-middle;
	}
</style>
