<script lang="ts">
	import { Work } from '$lib/frontend/class/Work';
	import type { PageData } from './$types';

	export let data: PageData;
	let work = new Work(data.work);
</script>

<svelte:head>
	<title>
		{work.titleLocal}
		|
		{work.titleEn}

		| ADG Tokyo</title
	>
</svelte:head>
<slot />
