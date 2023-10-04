<script lang="ts">
	import type { Property } from '$lib/frontend/class/Property';
	import { LocalEnSwitch } from '$lib/frontend/store';

	export let property: Property;
</script>

<strong>
	{#if $LocalEnSwitch == 'local'}
		{property.keyLocal}
	{:else}
		{property.keyEn}
	{/if}
</strong>
