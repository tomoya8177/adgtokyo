<script lang="ts">
	import Button from '../atoms/Button.svelte';
	export let editing: boolean;
	export let onSave: (() => void) | false = false;
	export let onDelete: (() => void) | false = false;
	export let onUp: (() => void) | false = false;
	export let onDown: (() => void) | false = false;
</script>

<div style="display:flex;gap:0rem">
	{#if editing}
		{#if !!onSave}
			<Button icon="save" onclick={onSave} />
		{/if}
		{#if !!onDelete}
			<Button icon="delete" onclick={onDelete} />
		{/if}
	{:else}
		{#if !!onUp}
			<Button icon="keyboard_arrow_up" onclick={onUp} />
		{/if}
		{#if !!onDown}
			<Button icon="keyboard_arrow_down" onclick={onDown} />
		{/if}
		{#if !!onSave}
			<Button
				icon="edit"
				onclick={() => {
					editing = true;
				}}
			/>
		{/if}
	{/if}
</div>
