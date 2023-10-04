<script lang="ts">
	import type { Work } from '$lib/frontend/class/Work';
	import { LocalEnSwitch } from '$lib/frontend/store';

	export let work: Work;
</script>

{#if $LocalEnSwitch == 'local'}
	<h2>
		{work.titleLocal}
	</h2>
	<small>
		{work.formatLocal}
	</small>
	<p>
		{@html work.descriptionLocal}
	</p>
{:else}
	<h2>
		{work.titleEn}
	</h2>
	<small>
		{work.formatEn}
	</small>
	<p>
		{@html work.descriptionEn}
	</p>
{/if}
