<script lang="ts">
	import { Entity } from '$lib/frontend/class/Entity';
	import type { PageData } from './$types';

	export let data: PageData;
	let entity = new Entity(data.entity);
</script>

<svelte:head>
	<title>
		{entity.nameLocal}
		/
		{entity.nameEn}

		| ADG Tokyo</title
	>
</svelte:head>
<slot />
