<script lang="ts">
	import type { Distribution } from '$lib/frontend/class/Distribution';
	import { LocalEnSwitch } from '$lib/frontend/store';

	export let distribution: Distribution;
</script>

{distribution.year}
{#if $LocalEnSwitch == 'local'}
	{distribution.regionLocal}
{:else}
	{distribution.regionEn}
{/if}
