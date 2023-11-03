<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import Icon from '$components/UIComponents/Icon.svelte';

	export let count: number;
	export let withLabel = true;
</script>

<div style="display:flex;gap:0.2rem">
	<Icon icon="thumb_up" />
	<span>
		{count}
	</span>
	{#if withLabel}
		<small>{_('total Good Jobs')}</small>
	{/if}
</div>
