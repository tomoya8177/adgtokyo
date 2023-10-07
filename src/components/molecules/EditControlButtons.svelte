<script lang="ts">
	import Button from '../atoms/Button.svelte';
	import Icon from '../atoms/Icon.svelte';
	export let editing: boolean;
	export let onSave: (() => void) | false = false;
	export let onDelete: (() => void) | false = false;
	export let onUp: (() => void) | false = false;
	export let onDown: (() => void) | false = false;
</script>

<div style="display:flex;gap:0rem;justify-content:end;">
	{#if editing}
		{#if !!onSave}
			<a href={'#'} on:click={onSave}>
				<Icon icon="save" />
			</a>
		{/if}
		{#if !!onDelete}
			<a href={'#'} on:click={onDelete}>
				<Icon icon="delete" />
			</a>
		{/if}
	{:else}
		{#if !!onUp}
			<a href={'#'} on:click={onUp}>
				<Icon icon="keyboard_arrow_up" />
			</a>
		{/if}
		{#if !!onDown}
			<a href={'#'} on:click={onDown}>
				<Icon icon="keyboard_arrow_down" />
			</a>
		{/if}
		{#if !!onSave}
			<a
				href={'#'}
				on:click={() => {
					editing = true;
				}}
			>
				<Icon icon="edit" />
			</a>
		{/if}
	{/if}
</div>
